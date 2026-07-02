// src/utils/sidebar.ts
import type { CollectionEntry } from 'astro:content';
import path from 'node:path';

export interface SidebarTree {
  folders: Record<string, SidebarTree>;
  files: { url: string; title: string; isIndex: boolean }[];
}

export function buildSidebarTree(allDocs: CollectionEntry<'docs'>[]): SidebarTree {
  const tree: SidebarTree = { folders: {}, files: [] };

  allDocs.forEach((doc) => {
    const slug = doc.id.replace(/\/index\.md$/, '').replace(/\.md$/, '');
    const url = slug === 'index' ? '/' : `/${slug}`; 
    const displayTitle = doc.data.title || path.basename(doc.id, '.md');

    if (slug === 'index') return;

    const parts = doc.id.split('/');
    let currentDir = tree; 

    for (let i = 0; i < parts.length - 1; i++) {
      const folderName = parts[i];
      if (!currentDir.folders[folderName]) {
        currentDir.folders[folderName] = { folders: {}, files: [] };
      }
      currentDir = currentDir.folders[folderName];
    }

    currentDir.files.push({
      url,
      title: displayTitle,
      isIndex: doc.id.endsWith('index.md')
    });
  });

  return tree;
}