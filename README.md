# 孟昊辉个人作品集网站

这是一个无外部依赖的静态作品集网站，适合直接部署到 GitHub Pages。页面内容来自本人提供的 TEMU 工作经历、简历优化方案与网站需求文档。

## 替换作品

1. 把视频、封面和简历文件放入 `assets` 文件夹。
2. 在 `index.html` 中搜索 `待补` 或 `待添加`，替换准确内容。
3. 在 `script.js` 的 `projectData` 中补充每个案例的目标、职责、工具与结果。
4. 如果加入 Showreel，可把首页的 `.play-placeholder` 替换为带 `controls` 的 `<video>` 元素。

## 上线方式

仓库设为 Public 后，在 GitHub 的 `Settings → Pages` 中选择从 `main` 分支根目录发布。网站不使用外部字体、框架或 CDN，避免第三方资源影响加载。

## 本地预览

直接打开 `index.html` 即可浏览；使用本地静态服务器时交互表现更接近线上版本。
