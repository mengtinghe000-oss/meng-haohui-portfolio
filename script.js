const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealItems = document.querySelectorAll("[data-reveal]");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8%" },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

const progress = document.querySelector(".scroll-progress span");
const hero = document.querySelector(".hero");
let ticking = false;

function updateScrollEffects() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progress.style.transform = `scaleX(${Math.min(1, ratio)})`;

  if (!reduceMotion && window.scrollY < window.innerHeight * 1.3) {
    hero.style.setProperty("--hero-shift", `${window.scrollY * 0.12}px`);
  }
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScrollEffects);
  },
  { passive: true },
);
updateScrollEffects();

const cursor = document.querySelector(".cursor");
if (window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
  window.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add("is-visible");
  });

  document.querySelectorAll("a, button").forEach((target) => {
    target.addEventListener("pointerenter", () => cursor.classList.add("is-active"));
    target.addEventListener("pointerleave", () => cursor.classList.remove("is-active"));
  });
}

const filterButtons = document.querySelectorAll("[data-filter]");
const archiveCards = document.querySelectorAll(".archive-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    archiveCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

const projectData = {
  "commercial-ugc": {
    number: "A—01",
    category: "COMMERCIAL VISUAL",
    title: "海外商品 UGC",
    summary: "建议放入家具或其他商品的海外 AIGC 广告案例，展示从卖点到成片的完整决策。",
    goal: "【待补：商品、投放平台、目标市场、受众与核心卖点】",
    role: "需求拆解 / 对标分析 / 场景母版 / 分镜 / 生成 / 剪辑包装【按真实情况调整】",
    tools: "【待补：本案例真实使用的 GPT Image、Nano Banana、Seedance、Veo 与后期软件】",
    result: "【待补：CTR、CVR、前三秒留存、完播率、消耗或跑量周期】",
  },
  "story-film": {
    number: "A—02",
    category: "AI FILM",
    title: "剧情类 AI Film",
    summary: "建议放入一条完整剧情短片，重点展示剧本拆解、镜头语言、连续性、声音与节奏。",
    goal: "【待补：故事命题、时长、目标情绪与发布场景】",
    role: "【待补：编剧 / AI 导演 / 分镜 / 生成 / 剪辑 / 声音中独立完成的部分】",
    tools: "【待补：图像、视频、声音、剪辑与调色工具】",
    result: "【待补：入选、播放、互动、制作周期或内部评价】",
  },
  "creator-video": {
    number: "A—03",
    category: "COMMERCIAL VISUAL",
    title: "原生达人口播",
    summary: "建议展示如何用原生感视觉、口播与前三秒 Hook 减少广告感并强化商品表达。",
    goal: "【待补：平台、市场、商品卖点与需要解决的投放问题】",
    role: "【待补：脚本适配、人物/商品生成、口播、剪辑包装与版本迭代】",
    tools: "【待补：人物一致性、口型、声音与后期工具】",
    result: "【待补：审核通过率、修改轮次、投放指标或衍生版本数量】",
  },
  "hybrid-film": {
    number: "A—04",
    category: "AI FILM / HYBRID",
    title: "AIGC × 实拍",
    summary: "建议展示 AI 素材与真实拍摄素材如何在光线、运动、空间和剪辑节奏上衔接。",
    goal: "【待补：为什么选择混合制作，以及 AI 解决了哪部分限制】",
    role: "【待补：拍摄筹备、素材审阅、AI 补充、合成与剪辑职责】",
    tools: "【待补：生成、抠像、合成、调色与声音工具】",
    result: "【待补：相比纯实拍的时间、成本、版本或质量收益】",
  },
  "image-system": {
    number: "A—05",
    category: "AI IMAGE CREATION",
    title: "场景母版系统",
    summary: "建议用输入—迭代—输出对比，证明商品、人物、空间与视觉风格的一致性控制能力。",
    goal: "【待补：商品准确度、人物一致性或场景风格的具体目标】",
    role: "【待补：参考选择、提示词结构、迭代判断与质量验收】",
    tools: "【待补：真实图像模型、参考方式与修复流程】",
    result: "【待补：成功率、平均迭代次数、复用场景或交付效率】",
  },
  "prompt-lab": {
    number: "A—06",
    category: "VISUAL EXPERIMENT",
    title: "Prompt / Skill Lab",
    summary: "建议把模板库、AIGC Skill / SOP 与失败修复方法做成可视化系统，而不是只写“熟练使用”。",
    goal: "【待补：模板体系解决的重复问题与覆盖片型】",
    role: "框架设计 / 模型测试 / 案例沉淀 / 质量检查【按真实情况调整】",
    tools: "【待补：模板数量、模块结构、版本机制与使用工具】",
    result: "【待补：团队复用、试错减少、修改轮次或制作周期变化】",
  },
};

const dialog = document.querySelector(".project-dialog");
const closeDialog = dialog.querySelector(".dialog-close");
const dialogFields = {
  number: document.querySelector("#dialog-number"),
  category: document.querySelector("#dialog-category"),
  title: document.querySelector("#dialog-title"),
  summary: document.querySelector("#dialog-summary"),
  goal: document.querySelector("#dialog-goal"),
  role: document.querySelector("#dialog-role"),
  tools: document.querySelector("#dialog-tools"),
  result: document.querySelector("#dialog-result"),
};

function openProjectDialog() {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
    return;
  }
  dialog.setAttribute("open", "");
  dialog.classList.add("is-fallback-open");
  document.body.classList.add("dialog-open");
}

function closeProjectDialog() {
  if (typeof dialog.close === "function") {
    dialog.close();
    return;
  }
  dialog.removeAttribute("open");
  dialog.classList.remove("is-fallback-open");
  document.body.classList.remove("dialog-open");
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectData[button.dataset.project];
    Object.entries(dialogFields).forEach(([key, element]) => {
      element.textContent = project[key];
    });
    openProjectDialog();
  });
});

closeDialog.addEventListener("click", closeProjectDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeProjectDialog();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && dialog.hasAttribute("open")) closeProjectDialog();
});
