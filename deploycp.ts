import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

export default function deploycp(): Plugin {
  return {
    name: 'hugo-deploy-plugin',
    closeBundle: async () => {
      console.log('Hugo Deploy Plugin: Starting...');
      const publicDir = 'public';
      const deployDir = 'deploy';

      console.log(`Checking if ${deployDir} exists...`);
      if (!fs.existsSync(deployDir)) {
        fs.mkdirSync(deployDir, { recursive: true });
        console.log(`Created ${deployDir} directory`);
      }

      console.log(`Copying files from ${publicDir} to ${deployDir}...`);
      copyDirectory(publicDir, deployDir);
      console.log('Copy complete');

      console.log('Processing HTML files...');
      processHtmlFiles(deployDir);
      console.log('HTML processing complete');

      console.log('Cleaning up deploy directory...');
      cleanupDeployDirectory(deployDir);
      console.log('Cleanup complete');

      console.log('Hugo Deploy Plugin: Finished');
    },
  };
}

function copyDirectory(src: string, dest: string) {
  fs.readdirSync(src).forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

function adjustCssUrls(css: string, cssPath: string, htmlPath: string): string {
  const cssDir = path.dirname(cssPath);
  const htmlDir = path.dirname(htmlPath);

  return css.replace(/url\(['"]?([^'"()]+)['"]?\)/g, (match, url) => {
    if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
      // No ajustar URLs absolutas o data URIs
      return match;
    }

    const absoluteAssetPath = path.resolve(cssDir, url);
    const relativeAssetPath = path.relative(htmlDir, absoluteAssetPath);

    return `url("${relativeAssetPath.replace(/\\/g, '/')}")`;
  });
}

function processHtmlFiles(dir: string) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      processHtmlFiles(filePath);
    } else if (path.extname(file) === '.html') {
      console.log(`Processing HTML file: ${filePath}`);
      let content = fs.readFileSync(filePath, 'utf-8');
      content = inlineStylesheets(content, dir, filePath);
      content = inlineScripts(content, dir);
      fs.writeFileSync(filePath, content);
      console.log(`Finished processing: ${filePath}`);
    }
  });
}

function inlineStylesheets(content: string, baseDir: string, htmlPath: string): string {
  console.log(`Searching for stylesheets in HTML content`);
  return content.replace(/<link[^>]*href=["']([^"']+)["'][^>]*>/gi, (match, href) => {
    console.log(`Found stylesheet link: ${href}`);
    const cssPath = path.join(baseDir, href);
    console.log(`Attempting to inline CSS from: ${cssPath}`);
    if (fs.existsSync(cssPath)) {
      let css = fs.readFileSync(cssPath, 'utf-8');
      css = adjustCssUrls(css, cssPath, htmlPath);
      console.log(`Inlined CSS from: ${cssPath} with adjusted URLs`);
      return `<style>${css}</style>`;
    }
    console.log(`CSS file not found: ${cssPath}`);
    return match;
  });
}

function inlineScripts(content: string, baseDir: string): string {
  console.log(`Searching for scripts in HTML content`);
  return content.replace(/<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi, (match, src) => {
    console.log(`Found script tag: ${src}`);
    const jsPath = path.join(baseDir, src);
    console.log(`Attempting to inline JS from: ${jsPath}`);
    if (fs.existsSync(jsPath)) {
      const js = fs.readFileSync(jsPath, 'utf-8');
      console.log(`Inlined JS from: ${jsPath}`);
      return `<script>${js}</script>`;
    }
    console.log(`JS file not found: ${jsPath}`);
    return match;
  });
}

function cleanupDeployDirectory(dir: string) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      cleanupDeployDirectory(filePath);
      if (fs.readdirSync(filePath).length === 0) {
        fs.rmdirSync(filePath);
        console.log(`Removed empty directory: ${filePath}`);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext !== '.html' && !['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) {
        fs.unlinkSync(filePath);
        console.log(`Removed file: ${filePath}`);
      }
    }
  });
}
