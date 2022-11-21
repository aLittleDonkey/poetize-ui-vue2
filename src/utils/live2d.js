/*
 * Live2D Widget
 * https://github.com/stevenjoezhang/live2d-widget
 */


import constant from "./constant";


// 注意：live2d_path 参数应使用绝对路径
const live2d_path = constant.live2d_path;

// 加载 waifu.css live2d.min.js
if (screen.width > 768) {
  Promise.all([
    loadExternalResource(live2d_path + "waifu.css", "css"),
    loadExternalResource(live2d_path + "live2d.min.js", "js")
  ]).then(() => {
    initWidget({
      waifuPath: constant.baseURL + constant.waifuPath,
      cdnPath: constant.cdnPath
    });
  });
}

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag;

    if (type === "css") {
      tag = document.createElement("link");
      tag.rel = "stylesheet";
      tag.href = url;
    } else if (type === "js") {
      tag = document.createElement("script");
      tag.src = url;
    }

    if (tag) {
      tag.onload = () => resolve(url);
      tag.onerror = () => reject(url);
      document.head.appendChild(tag);
    }
  });
}

function initWidget(config) {
  document.body.insertAdjacentHTML("beforeend", `<div id="waifu-toggle">
			<span>看板娘</span>
		</div>`);
  const toggle = document.getElementById("waifu-toggle");
  toggle.addEventListener("click", () => {
    toggle.classList.remove("waifu-toggle-active");
    if (toggle.getAttribute("first-time")) {
      loadWidget(config);
      toggle.removeAttribute("first-time");
    } else {
      localStorage.removeItem("waifu-display");
      document.getElementById("waifu").style.display = "";
      setTimeout(() => {
        document.getElementById("waifu").style.bottom = 0;
      }, 0);
    }
  });
  if (localStorage.getItem("waifu-display") && Date.now() - localStorage.getItem("waifu-display") <= 86400000) {
    toggle.setAttribute("first-time", true);
    setTimeout(() => {
      toggle.classList.add("waifu-toggle-active");
    }, 0);
  } else {
    loadWidget(config);
  }
}

function loadWidget(config) {
  // 配置路径
  let {waifuPath, cdnPath} = config;
  if (!cdnPath.endsWith("/")) cdnPath += "/";
  let modelList, idx = 0;

  // 插入html
  localStorage.removeItem("waifu-display");
  localStorage.removeItem("waifu-text");
  document.body.insertAdjacentHTML("beforeend", `<div id="waifu">
			<div id="waifu-tips"></div>
			<canvas id="live2d" width="800" height="800"></canvas>
      <!-- 工具 -->
			<div id="waifu-tool">
				<span class="fa fa-lg fa-comment"></span>
				<span class="fa fa-lg fa-street-view"></span>
				<span class="fa fa-lg fa-mouse-pointer"></span>
				<span class="fa fa-lg fa-times"></span>
			</div>
		</div>`);
  setTimeout(() => {
    document.getElementById("waifu").style.bottom = 0;
  }, 0);

  // 检测用户活动状态，并在空闲时显示消息
  let userAction = false,
    userActionTimer,
    messageTimer,
    messageArray = ["好久不见，日子过得好快呢……", "大坏蛋！你都多久没理人家了呀，嘤嘤嘤～", "嗨～快来逗我玩吧！", "拿小拳拳锤你胸口！", "记得把小家加入 Adblock 白名单哦！"];
  window.addEventListener("mousemove", () => userAction = true);
  window.addEventListener("keydown", () => userAction = true);
  setInterval(() => {
    if (userAction) {
      userAction = false;
      clearInterval(userActionTimer);
      userActionTimer = null;
    } else if (!userActionTimer) {
      userActionTimer = setInterval(() => {
        showMessage(randomSelection(messageArray), 6000, 9);
      }, 20000);
    }
  }, 1000);

  // 监听器
  (function registerEventListener() {
    document.querySelector("#waifu-tool .fa-comment").addEventListener("click", showHitokoto);
    document.querySelector("#waifu-tool .fa-street-view").addEventListener("click", loadRandModel);
    document.querySelector("#waifu-tool .fa-mouse-pointer").addEventListener("click", changeMouseAnimation);
    document.querySelector("#waifu-tool .fa-times").addEventListener("click", () => {
      localStorage.setItem("waifu-display", Date.now());
      showMessage("愿你有一天能与重要的人重逢。", 2000, 11);
      document.getElementById("waifu").style.bottom = "-500px";
      setTimeout(() => {
        document.getElementById("waifu").style.display = "none";
        document.getElementById("waifu-toggle").classList.add("waifu-toggle-active");
      }, 3000);
    });

    const devtools = () => {
    };
    console.log("%c", devtools);
    devtools.toString = () => {
      showMessage("哈哈，你打开了控制台，是想要看看我的小秘密吗？", 6000, 9);
    };
    window.addEventListener("copy", () => {
      showMessage("你都复制了些什么呀，转载要记得加上出处哦！", 6000, 9);
    });
    window.addEventListener("visibilitychange", () => {
      if (!document.hidden) showMessage("哇，你终于回来了～", 6000, 9);
    });

    localStorage.setItem("showMouseAnimation", "1");
    document.querySelector("body").addEventListener("click", mouseAnimation);
  })();

  // 欢迎页
  (function welcomeMessage() {
    let text;
    if (location.pathname === "/") { // 如果是主页
      const now = new Date().getHours();
      if (now > 5 && now <= 7) text = "早上好！一日之计在于晨，美好的一天就要开始了。";
      else if (now > 7 && now <= 11) text = "上午好！工作顺利嘛，不要久坐，多起来走动走动哦！";
      else if (now > 11 && now <= 13) text = "中午了，工作了一个上午，现在是午餐时间！";
      else if (now > 13 && now <= 17) text = "午后很容易犯困呢，今天的运动目标完成了吗？";
      else if (now > 17 && now <= 19) text = "傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红～";
      else if (now > 19 && now <= 21) text = "晚上好，今天过得怎么样？";
      else if (now > 21 && now <= 23) text = ["已经这么晚了呀，早点休息吧，晚安～", "深夜时要爱护眼睛呀！"];
      else text = "你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？";
    } else if (document.referrer !== "") {
      const referrer = new URL(document.referrer),
        domain = referrer.hostname.split(".")[1];
      if (location.hostname === referrer.hostname) text = `欢迎阅读<span>「${document.title.split(" - ")[0]}」</span>`;
      else if (domain === "baidu") text = `Hello！来自 百度搜索 的朋友<br>你是搜索 <span>${referrer.search.split("&wd=")[1].split("&")[0]}</span> 找到的我吗？`;
      else if (domain === "so") text = `Hello！来自 360搜索 的朋友<br>你是搜索 <span>${referrer.search.split("&q=")[1].split("&")[0]}</span> 找到的我吗？`;
      else if (domain === "google") text = `Hello！来自 谷歌搜索 的朋友<br>欢迎阅读<span>「${document.title.split(" - ")[0]}」</span>`;
      else text = `Hello！来自 <span>${referrer.hostname}</span> 的朋友`;
    } else {
      text = `欢迎阅读<span>「${document.title.split(" - ")[0]}」</span>`;
    }
    showMessage(text, 7000, 8);
  })();

  // 初始化模型
  (function initModel() {
    let modelId = localStorage.getItem("modelId");
    if (modelId === null) {
      // 首次访问加载 指定模型 的 指定材质
      modelId = 5; // 模型 ID
    }
    loadModel(modelId);
    fetch(waifuPath)
      .then(response => response.json())
      .then(result => {
        window.addEventListener("mouseover", event => {
          for (let {selector, text} of result.mouseover) {
            if (!event.target.matches(selector)) continue;
            text = randomSelection(text);
            text = text.replace("{text}", event.target.innerText);
            showMessage(text, 4000, 8);
            return;
          }
        });
        window.addEventListener("click", event => {
          for (let {selector, text} of result.click) {
            if (!event.target.matches(selector)) continue;
            text = randomSelection(text);
            text = text.replace("{text}", event.target.innerText);
            showMessage(text, 4000, 8);
            return;
          }
        });
        result.seasons.forEach(({date, text}) => {
          const now = new Date(),
            after = date.split("-")[0],
            before = date.split("-")[1] || after;
          if ((after.split("/")[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split("/")[0]) && (after.split("/")[1] <= now.getDate() && now.getDate() <= before.split("/")[1])) {
            text = randomSelection(text);
            text = text.replace("{year}", now.getFullYear());
            messageArray.push(text);
          }
        });
      });
  })();

  // 模型集合
  async function loadModelList() {
    const response = await fetch(`${cdnPath}model_list.json`);
    modelList = await response.json();
  }

  // 载入模型
  async function loadModel(modelId, message) {
    localStorage.setItem("modelId", modelId);
    showMessage(message, 4000, 10);
    if (!modelList) await loadModelList();
    // const target = randomSelection(modelList.models[modelId]);
    const target = "HyperdimensionNeptunia/blanc_swimwear";
    loadlive2d("live2d", `${cdnPath}model/${target}/index.json`);
  }

  // 换肤
  async function loadRandModel() {
    const modelId = localStorage.getItem("modelId");
    if (!modelList) await loadModelList();
    const target = randomSelection(modelList.models[modelId]);
    loadlive2d("live2d", `${cdnPath}model/${target}/index.json`);
    showMessage("我的新衣服好看嘛？", 4000, 10);
  }

  // 换人
  async function loadOtherModel() {
    let modelId = localStorage.getItem("modelId");
    if (!modelList) await loadModelList();
    const index = (++modelId >= modelList.models.length) ? 0 : modelId;
    loadModel(index, modelList.messages[index]);
  }

  // 转换鼠标动画
  function changeMouseAnimation() {
    if (localStorage.getItem("showMouseAnimation") === "0") {
      localStorage.setItem("showMouseAnimation", "1");
      document.querySelector("body").addEventListener("click", mouseAnimation);
      showMessage("哈哈，要牢记社会主义核心价值观哦！", 6000, 9);
    } else {
      localStorage.setItem("showMouseAnimation", "0");
      document.querySelector("body").removeEventListener("click", mouseAnimation);
      showMessage("今天你爱国了吗？", 6000, 9);
    }
  }

  // 鼠标动画
  function mouseAnimation(e) {
    let list = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善");
    let span = $("<span>").text(list[idx]);
    idx = (idx + 1) % list.length;
    let x = e.pageX, y = e.pageY;
    span.css({
      "z-index": 1000,
      "top": y - 20,
      "left": x,
      "position": "absolute",
      "pointer-events": "none",
      "font-weight": "bold",
      "color": "#ff6651"
    });
    $("body").append(span);
    span.animate({"top": y - 180, "opacity": 0}, 1500, function () {
      span.remove();
    });
  }

  // 随机选择
  function randomSelection(obj) {
    return Array.isArray(obj) ? obj[Math.floor(Math.random() * obj.length)] : obj;
  }

  // 随机词
  function showHitokoto() {
    // 增加 hitokoto.cn 的 API
    fetch(constant.hitokoto)
      .then(response => response.json())
      .then(result => {
        const text = `这句一言来自 <span>「${result.from}」</span>，是 <span>${result.creator}</span> 在 hitokoto.cn 投稿的。`;
        showMessage(result.hitokoto, 6000, 9);
        setTimeout(() => {
          showMessage(text, 4000, 9);
        }, 6000);
      });
  }

  // 显示消息
  function showMessage(text, timeout, priority) {
    if (!text || (localStorage.getItem("waifu-text") && localStorage.getItem("waifu-text") > priority)) return;
    if (messageTimer) {
      clearTimeout(messageTimer);
      messageTimer = null;
    }
    text = randomSelection(text);
    localStorage.setItem("waifu-text", priority);
    const tips = document.getElementById("waifu-tips");
    tips.innerHTML = text;
    tips.classList.add("waifu-tips-active");
    messageTimer = setTimeout(() => {
      localStorage.removeItem("waifu-text");
      tips.classList.remove("waifu-tips-active");
    }, timeout);
  }
}
