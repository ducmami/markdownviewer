import type { D2 as D2Type, CompileOptions, CompileResponse } from '@terrastruct/d2';

type CompileString = (input: string, options?: CompileOptions) => Promise<CompileResponse>;

let d2Promise: Promise<D2Type> | null = null;
let renderQueue: Promise<unknown> = Promise.resolve();

function getD2(): Promise<D2Type> {
  if (!d2Promise) {
    d2Promise = import('@terrastruct/d2').then((mod) => new mod.D2());
  }
  return d2Promise;
}

const cache = new Map<string, string>();

function enqueueD2Task<T>(task: () => Promise<T>): Promise<T> {
  const queuedTask = renderQueue.then(task, task);
  renderQueue = queuedTask.then(
    () => undefined,
    () => undefined
  );
  return queuedTask;
}

export interface D2RenderParams {
  isDark?: boolean;
}

export async function compileAndRenderD2(
  content: string,
  { isDark = false }: D2RenderParams = {}
): Promise<string> {
  const key = `${isDark ? 'dark' : 'light'}|${content}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  return enqueueD2Task(async () => {
    const queuedCached = cache.get(key);
    if (queuedCached !== undefined) return queuedCached;

    const d2 = await getD2();
    const themeID = isDark ? 200 : 0;

    const compileOptions: CompileOptions = {
      layout: 'dagre',
      themeID,
      darkThemeID: themeID,
      sketch: false,
      pad: 20,
      center: true,
      noXMLTag: true,
    };

    const compile = d2.compile.bind(d2) as CompileString;
    const result = await compile(content, compileOptions);
    const svg = await d2.render(result.diagram, {
      ...result.renderOptions,
      themeID,
      darkThemeID: themeID,
      noXMLTag: true,
    });

    cache.set(key, svg);
    return svg;
  });
}
