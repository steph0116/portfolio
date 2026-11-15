(function () {
  const body = document.body;
  const modeButtons = Array.from(document.querySelectorAll("[data-mode]"));
  const toast = document.getElementById("mode-toast");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const params = new URLSearchParams(location.search);
  const savedMode = (() => {
    try { return localStorage.getItem("steph-portfolio-mode"); } catch (e) { return null; }
  })();

  const projectData = {
    habit: {
      kicker: "01 / PRODUCT · 0→1",
      title: "Habit Loop",
      subtitle: "自律打卡",
      meta: "2026.09–至今 · 独立产品 / 开发",
      image: "assets/habit-home.png",
      body: "把“长长的待办清单”压缩成每天 1–3 个重点。从用户问题、交互、落地页，到网页版和 Android 测试版，都是我一个人做完的。",
      points: [
        "核心机制：1–3 个今日重点、本周复盘、每周一次补签",
        "独立开发：PWA + Android APK，本地通知、数据导入导出",
        "增长准备：首启来源问卷、事件日志、网页版 + APK 双 CTA"
      ],
      links: [
        ["打开产品", "https://steph0116.github.io/habit/"],
        ["网页版落地页", "https://steph0116.github.io/habit/web/"]
      ]
    },
    ads: {
      kicker: "02 / GROWTH · EXPERIMENT",
      title: "Google Ads",
      subtitle: "海外投放测试",
      meta: "2026.11–进行中 · 个人项目",
      image: "assets/google-ads-cover.png",
      body: "用 ¥70/天 × 5 天的小预算，验证哪一句 Search 文案能把人带到网页版，而不是只验证“能不能投”。",
      points: [
        "面向香港 / 新加坡 / 马来西亚 18–30 岁华语用户",
        "搭建 Search 广告、UTM、Google Tag 转化 Web app open",
        "用 Tag Assistant 验证点击转化，区分 CTR / CVR / CPA"
      ],
      links: [
        ["看项目一页", "assets/google-ads.pdf"],
        ["打开落地页", "https://steph0116.github.io/habit/web/"]
      ]
    },
    zhong: {
      kicker: "03 / BRAND · INSIGHT",
      title: "钟薛高",
      subtitle: "把「贵」翻译成「值」",
      meta: "2026.10–2026.11 · 品牌重启研究",
      image: "assets/zhongxuegao-cover.png",
      body: "基于公开信息与社媒评论，拆解 2018–2026 的品牌兴衰：用户不是不愿买，是“贵的理由”没被讲清楚。",
      points: [
        "JTBD + 4P + 竞品定位 + 三角验证，区分事实 / 观察 / 洞察",
        "提出“不做网红，做雪糕”：¥7.9 明码标价、真材实料、好吃为基本",
        "落到详情页 / 社媒 / 冰柜 3 个触点，产出 12 页研究 deck"
      ],
      links: [
        ["看完整研究", "assets/zhongxuegao-deck.pdf"],
        ["看品牌屋", "assets/zhongxuegao-brandhouse.png"]
      ]
    },
    resume: {
      kicker: "CV / RESUME",
      title: "简历",
      subtitle: "Marketing × Product",
      meta: "中文营销 · 中文产品 · English CV",
      body: "英语出身，转向市场营销与产品。做过中东市场招聘、国际组织传播、药企 Marketing 招聘；现在用 Habit Loop 和 Google Ads 测试补产品与增长经验。",
      summaryStats: [
        ["7.0", "IELTS", "英语能力"],
        ["50/日", "SCREEN", "药企 MKT 招聘"],
        ["6000+", "USD", "国际组织募捐"]
      ],
      points: [
        "香港中文大学 · 市场营销硕士（2027 级拟入学）",
        "美团 Keeta 中东市场 · 20+ offers · LinkedIn/WhatsApp 全英文",
        "HRnetGroup 药企 Marketing 招聘 · ICENECDEV 国际组织"
      ],
      sections: [
        {
          label: "EDUCATION / 教育",
          items: [
            ["2027 级", "香港中文大学 · 市场营销硕士", "已录取（拟入学）"],
            ["2023–2027", "哈尔滨工业大学 · 英语本科", "财务管理双学位 · IELTS 7.0"]
          ]
        },
        {
          label: "EXPERIENCE / 经历",
          items: [
            ["2026.07–", "美团 Keeta · 中东市场", "海外招聘实习生 · 沙特 / 科威特为主", "全流程管理岗招聘，LinkedIn/WhatsApp 全英文沟通，累计推进 20+ offer；主要招聘站长、仓长等开拓攻坚型管理岗。"],
            ["2026.01–03", "HRnetGroup · 医药市场猎头（MKT）", "Marketing 招聘 · 高级产品经理等岗位", "聚焦药企 Marketing 招聘，理解产品与药品市场；日均筛选 50 份简历、20+ 电话沟通，累计推荐 20+ 候选人。"],
            ["2024.01–04", "ICENECDEV · 国际组织", "国际实习生 · 环保传播", "运营海外社媒，对接多国机构，参与线上募捐累计筹集 6000+ 美元；推进欧洲 20 国银行数据标准化与合规审查。"]
          ]
        },
        {
          label: "CAMPUS & CONTENT / 校园",
          items: [
            ["2023–2024", "校电视台 · 策划", "12 期毕业季 / 迎新内容", "视频号平均播放量提升 40%，单篇阅读破万；根据播放与互动数据优化选题和脚本。"],
            ["2023–2024", "校博物馆讲解团 · 部长", "公众号与社团活动", "统筹 100+ 场团体参观，策划招新和社团活动。"]
          ]
        }
      ],
      skills: ["Google Ads", "Tag Assistant", "UTM", "关键词研究", "广告文案", "转化漏斗", "A/B 测试", "Excel", "NVivo", "LinkedIn", "WhatsApp", "HTML/CSS/JS", "Capacitor", "PWA", "GitHub Pages"],
      honors: [
        "哈工大优秀学生",
        "哈工大学生代表大会代表",
        "入党积极分子培训班优秀学员",
        "外研社·国才杯英语阅读大赛校级三等奖",
        "连续两次获语言学院学生会优秀部员"
      ],
      links: [
        ["中文营销简历", "assets/resume-cn-marketing.pdf"],
        ["中文产品简历", "assets/resume-cn-product.pdf"],
        ["English CV", "assets/resume-en-product.pdf"]
      ]
    }
  };

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  /* ---------- immersive 3D pool ---------- */
  const pool = (() => {
    const experience = document.getElementById("pool-experience");
    const canvas = document.getElementById("pool-canvas");
    const labelLayer = document.getElementById("pool-labels");
    const panel = document.getElementById("pool-panel");
    const panelBody = document.getElementById("pool-panel-body");
    const panelIndex = document.getElementById("pool-panel-index");
    const closeButton = document.getElementById("pool-close");
    const homeButton = document.querySelector("[data-pool-home]");
    const ambientButton = document.getElementById("pool-ambient");
    const depthLabel = document.getElementById("pool-depth");
    const voyagePanel = document.getElementById("pool-voyage");
    const voyageTitle = document.getElementById("pool-voyage-title");
    const voyageMeta = document.getElementById("pool-voyage-meta");
    const labels = Array.from(labelLayer ? labelLayer.querySelectorAll("[data-project]") : []);
    const projectButtons = Array.from(document.querySelectorAll(".pool-dock [data-project]"));
    const routeOrder = ["habit", "ads", "zhong", "resume"];
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const damp = (current, target, speed, dt) => current + (target - current) * (1 - Math.exp(-speed * dt));
    const ringDefinitions = [
      { id: "habit", x: -6.15, z: 1.05, r: 1.35, tube: .17, color: 0x74ffd0 },
      { id: "ads", x: .35, z: -3.25, r: 1.62, tube: .16, color: 0xff806d },
      { id: "zhong", x: 6.15, z: .95, r: 1.34, tube: .16, color: 0xffd678 },
      { id: "resume", x: .35, z: 4.15, r: .84, tube: .095, color: 0xb4c4ff }
    ];

    let renderer;
    let scene;
    let camera;
    let water;
    let tileMaterial;
    let clock;
    let raf;
    let running = false;
    let initialized = false;
    let rings = [];
    let bubbles;
    let sparkles;
    let boat;
    let voyage = null;
    let raycaster;
    let pointer;
    let mouseX = 0;
    let mouseY = 0;
    let orbit = 0;
    let orbitTarget = 0;
    let zoom = 0;
    let zoomTarget = 0;
    let hovered = null;
    let focused = null;
    let currentProject = "";
    let dragStart = null;
    let lastPointer = null;
    let audioContext;
    let ambientMaster;
    let ambientOn = false;
    let ambientNodes = [];

    function makeTileMaterial() {
      return new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uTint: { value: new THREE.Color(0x07558b) },
          uScale: { value: new THREE.Vector2(10, 9) }
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vWorld;
          void main() {
            vUv = uv;
            vec4 world = modelMatrix * vec4(position, 1.0);
            vWorld = world.xyz;
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uTint;
          uniform vec2 uScale;
          varying vec2 vUv;
          varying vec3 vWorld;

          float caustic(vec2 p, float t) {
            vec2 q = p * 1.45;
            q += vec2(sin(q.y * 1.1 + t * .37), cos(q.x * .9 - t * .29)) * .42;
            float a = sin(q.x * 3.7 + sin(q.y * 2.2 + t * .31) * 1.8);
            float b = sin(q.y * 4.1 + cos(q.x * 1.7 - t * .26) * 1.6);
            return pow(max(0.0, (a + b) * .5), 5.0);
          }

          void main() {
            vec2 tile = abs(fract(vUv * uScale) - .5);
            float grout = smoothstep(.445, .488, max(tile.x, tile.y));
            float depth = smoothstep(-4.8, .1, vWorld.y);
            vec3 base = uTint * (.58 + depth * .27);
            base += vec3(.01, .09, .17) * (1.0 - depth) * .42;
            float light = caustic(vUv * uScale + vWorld.xz * .07, uTime);
            vec3 color = base + vec3(.17, .68, .96) * light * (.24 + .23 * depth);
            color -= vec3(.008, .025, .045) * grout;
            float edge = smoothstep(.0, .10, vUv.x) * smoothstep(.0, .10, 1.0 - vUv.x)
                       * smoothstep(.0, .10, vUv.y) * smoothstep(.0, .10, 1.0 - vUv.y);
            color *= .66 + edge * .34;
            gl_FragColor = vec4(color, 1.0);
          }
        `
      });
    }

    function makeWater() {
      const geometry = new THREE.PlaneGeometry(22, 18, 150, 120);
      const material = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          uniform float uTime;
          varying vec2 vUv;
          varying vec3 vWorld;
          void main() {
            vUv = uv;
            vec3 p = position;
            p.z += sin(p.x * 1.12 + uTime * .82) * .115
                 + cos(p.y * 1.48 + uTime * .58) * .075
                 + sin((p.x + p.y) * .61 + uTime * 1.04) * .045;
            vec4 world = modelMatrix * vec4(p, 1.0);
            vWorld = world.xyz;
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec2 vUv;
          varying vec3 vWorld;
          void main() {
            vec2 p = vUv * vec2(16.0, 13.0);
            float waveA = sin(p.x * 1.1 + p.y * .55 + uTime * .78);
            float waveB = sin(p.x * .45 - p.y * 1.32 - uTime * .61);
            float wave = waveA * .5 + waveB * .5;
            float ripple = smoothstep(.82, 1.0, sin(length(p - vec2(7.5, 6.0)) * 4.2 - uTime * 1.1) * .5 + .5);
            vec3 deep = vec3(.008, .095, .23);
            vec3 aqua = vec3(.025, .43, .72);
            vec3 sky = vec3(.24, .76, .96);
            vec3 color = mix(deep, aqua, .38 + wave * .21);
            color = mix(color, sky, max(0.0, waveA) * .055 + ripple * .13);
            vec3 viewDir = normalize(cameraPosition - vWorld);
            float fresnel = pow(1.0 - clamp(viewDir.y, 0.0, 1.0), 2.2);
            color += vec3(.18, .68, .98) * fresnel * .34;
            float glint = pow(max(0.0, sin(p.x * 4.1 + p.y * 2.2 + uTime * 1.15)), 26.0);
            color += vec3(.65, .90, 1.0) * glint * .22;
            gl_FragColor = vec4(color, .78);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = .08;
      mesh.renderOrder = 3;
      return mesh;
    }

    function canvasTexture(draw, width, height) {
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = width;
      textureCanvas.height = height;
      const context = textureCanvas.getContext("2d");
      draw(context, width, height);
      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    }

    function makeHabitSymbol() {
      const group = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(.78, 1.34, .085),
        new THREE.MeshStandardMaterial({ color: 0x0b1c18, roughness: .34, metalness: .18 })
      );
      group.add(body);
      const plate = new THREE.Mesh(
        new THREE.PlaneGeometry(.68, 1.2),
        new THREE.MeshBasicMaterial({ color: 0xd6ff72, transparent: true, opacity: .13 })
      );
      plate.position.z = .048;
      group.add(plate);
      const symbol = new THREE.Mesh(
        new THREE.TorusGeometry(.22, .025, 12, 48, Math.PI * 1.55),
        new THREE.MeshBasicMaterial({ color: 0xd6ff72 })
      );
      symbol.position.z = .055;
      symbol.rotation.z = -.25;
      group.add(symbol);
      return group;
    }

    function makeAdsSymbol() {
      const group = new THREE.Group();
      const texture = canvasTexture((ctx, width, height) => {
        ctx.fillStyle = "#081b17";
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = "rgba(255,128,105,.42)";
        ctx.lineWidth = 3;
        ctx.strokeRect(5, 5, width - 10, height - 10);
        ctx.fillStyle = "#ff8069";
        ctx.font = "700 24px sans-serif";
        ctx.fillText("SEARCH / 05 DAYS", 34, 50);
        ctx.fillStyle = "rgba(245,238,221,.34)";
        ctx.font = "16px sans-serif";
        ctx.fillText("CTR      CVR      CPA", 34, 86);
        const heights = [72, 105, 54, 128, 90];
        heights.forEach((bar, index) => {
          ctx.fillStyle = index === 3 ? "#ff8069" : "rgba(220,255,121,.40)";
          ctx.fillRect(38 + index * 62, 250 - bar, 34, bar);
        });
      }, 420, 280);
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(1.45, .96),
        new THREE.MeshBasicMaterial({ map: texture, transparent: true })
      );
      group.add(card);
      return group;
    }

    function makeZhongSymbol() {
      const group = new THREE.Group();
      const cream = new THREE.MeshStandardMaterial({
        color: 0xe8ce92,
        roughness: .38,
        metalness: .03
      });
      const bar = new THREE.Mesh(new THREE.BoxGeometry(.52, 1.02, .26), cream);
      bar.position.y = .22;
      group.add(bar);
      const top = new THREE.Mesh(new THREE.SphereGeometry(.26, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), cream);
      top.scale.y = .38;
      top.position.y = .73;
      group.add(top);
      const stick = new THREE.Mesh(
        new THREE.BoxGeometry(.16, .55, .07),
        new THREE.MeshStandardMaterial({ color: 0xb48b56, roughness: .8 })
      );
      stick.position.y = -.55;
      group.add(stick);
      const shine = new THREE.Mesh(
        new THREE.PlaneGeometry(.08, .7),
        new THREE.MeshBasicMaterial({ color: 0xfff2c8, transparent: true, opacity: .42 })
      );
      shine.position.set(-.12, .25, .135);
      group.add(shine);
      return group;
    }

    function makeResumeSymbol() {
      const group = new THREE.Group();
      const texture = canvasTexture((ctx, width, height) => {
        ctx.fillStyle = "#f3ecd6";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#0a201b";
        ctx.fillRect(42, 42, 82, 82);
        ctx.fillStyle = "#dcff79";
        ctx.font = "500 54px Georgia, serif";
        ctx.fillText("CV", 52, 101);
        ctx.fillStyle = "#12322a";
        ctx.font = "700 20px sans-serif";
        ctx.fillText("SUN HAOZE / STEPH", 42, 175);
        ctx.fillStyle = "rgba(10,32,27,.38)";
        ctx.font = "15px sans-serif";
        ctx.fillText("MARKETING × PRODUCT", 42, 205);
        for (let index = 0; index < 7; index += 1) {
          ctx.fillStyle = index % 3 === 0 ? "#ff8069" : "rgba(10,32,27,.19)";
          ctx.fillRect(42, 248 + index * 28, index % 2 ? 280 : 340, 3);
        }
      }, 430, 600);
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(.84, 1.17),
        new THREE.MeshBasicMaterial({ map: texture, transparent: true })
      );
      group.add(card);
      return group;
    }

    function makeSymbol(id) {
      if (id === "habit") return makeHabitSymbol();
      if (id === "ads") return makeAdsSymbol();
      if (id === "zhong") return makeZhongSymbol();
      return makeResumeSymbol();
    }

    function makeBoat() {
      const group = new THREE.Group();
      const hullShape = new THREE.Shape();
      hullShape.moveTo(0, -1.38);
      hullShape.bezierCurveTo(.38, -1.1, .64, -.38, .58, .22);
      hullShape.quadraticCurveTo(.55, .9, 0, 1.14);
      hullShape.quadraticCurveTo(-.55, .9, -.58, .22);
      hullShape.bezierCurveTo(-.64, -.38, -.38, -1.1, 0, -1.38);

      const hullGeometry = new THREE.ExtrudeGeometry(hullShape, {
        depth: .36,
        curveSegments: 32,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: .045,
        bevelSize: .035,
        bevelSegments: 2
      });
      hullGeometry.rotateX(-Math.PI / 2);
      const hull = new THREE.Mesh(hullGeometry, new THREE.MeshStandardMaterial({
        color: 0x6f421f,
        roughness: .46,
        metalness: .06,
        side: THREE.DoubleSide
      }));
      hull.position.y = -.38;
      group.add(hull);

      const deck = new THREE.Mesh(
        new THREE.ShapeGeometry(hullShape, 32),
        new THREE.MeshStandardMaterial({ color: 0x402918, roughness: .76 })
      );
      deck.rotation.x = -Math.PI / 2;
      deck.scale.set(.82, .86, 1);
      deck.position.set(0, -.012, .06);
      group.add(deck);

      const railPoints = hullShape.getPoints(64).map((point) => new THREE.Vector3(point.x, 0, -point.y));
      const rail = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(railPoints),
        new THREE.LineBasicMaterial({ color: 0xe0bb72, transparent: true, opacity: .9 })
      );
      rail.position.y = -.005;
      group.add(rail);

      const seatMaterial = new THREE.MeshStandardMaterial({ color: 0xc99a5c, roughness: .55 });
      [-.42, .34].forEach((z) => {
        const seat = new THREE.Mesh(new THREE.BoxGeometry(.9, .045, .19), seatMaterial);
        seat.position.set(0, .04, z);
        group.add(seat);
      });

      const mast = new THREE.Mesh(
        new THREE.CylinderGeometry(.018, .025, 1.45, 10),
        new THREE.MeshStandardMaterial({ color: 0xcedfd9, roughness: .28, metalness: .55 })
      );
      mast.position.set(0, .76, -.18);
      group.add(mast);

      const sailShape = new THREE.Shape();
      sailShape.moveTo(0, 0);
      sailShape.lineTo(.84, .2);
      sailShape.lineTo(0, .92);
      sailShape.closePath();
      const sail = new THREE.Mesh(
        new THREE.ShapeGeometry(sailShape),
        new THREE.MeshBasicMaterial({
          color: 0xcdf9ff,
          transparent: true,
          opacity: .32,
          side: THREE.DoubleSide
        })
      );
      sail.position.set(.02, .52, -.15);
      sail.rotation.y = -.24;
      group.add(sail);

      const pennant = new THREE.Mesh(
        new THREE.PlaneGeometry(.24, .12),
        new THREE.MeshBasicMaterial({ color: 0xff967d, side: THREE.DoubleSide })
      );
      pennant.position.set(.13, 1.54, -.16);
      group.add(pennant);

      const lantern = new THREE.Mesh(
        new THREE.SphereGeometry(.075, 18, 12),
        new THREE.MeshBasicMaterial({ color: 0xffd78a })
      );
      lantern.position.set(0, 1.43, .92);
      group.add(lantern);
      const lanternLight = new THREE.PointLight(0xffc887, 2.6, 4.5, 2);
      lanternLight.position.copy(lantern.position);
      group.add(lanternLight);

      const oarMaterial = new THREE.MeshStandardMaterial({ color: 0x8d5e30, roughness: .62 });
      [-1, 1].forEach((side) => {
        const oar = new THREE.Mesh(new THREE.CylinderGeometry(.015, .022, 1.2, 8), oarMaterial);
        oar.position.set(side * .56, -.02, .02);
        oar.rotation.z = side * (Math.PI / 2.3);
        oar.rotation.x = -.18;
        group.add(oar);
        const blade = new THREE.Mesh(new THREE.BoxGeometry(.16, .025, .32), oarMaterial);
        blade.position.set(side * 1.04, -.12, -.06);
        blade.rotation.y = side * .18;
        group.add(blade);
      });

      const wake = new THREE.Group();
      for (let index = 0; index < 3; index += 1) {
        const ripple = new THREE.Mesh(
          new THREE.RingGeometry(.42 + index * .2, .435 + index * .2, 48),
          new THREE.MeshBasicMaterial({
            color: 0xa5f4ff,
            transparent: true,
            opacity: .18 - index * .04,
            side: THREE.DoubleSide,
            depthWrite: false
          })
        );
        ripple.rotation.x = -Math.PI / 2;
        ripple.position.set(0, -.01, -1.28 - index * .3);
        ripple.scale.y = 1.55;
        wake.add(ripple);
      }
      group.add(wake);
      group.userData.wake = wake;
      group.position.set(-1.65, .45, 6.35);
      group.rotation.y = .32;
      group.scale.setScalar(.78);
      scene.add(group);
      return group;
    }

    function makeRouteGuide() {
      const points = ringDefinitions.map((def) => new THREE.Vector3(
        def.x,
        .17,
        def.z + def.r + .62
      ));
      points.unshift(new THREE.Vector3(-1.65, .17, 6.35));
      const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
      const route = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 150, .018, 5, false),
        new THREE.MeshBasicMaterial({
          color: 0x8cecff,
          transparent: true,
          opacity: .19,
          depthWrite: false
        })
      );
      route.renderOrder = 4;
      scene.add(route);
    }

    function makeRing(def) {
      const group = new THREE.Group();
      const color = new THREE.Color(def.color);
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: .22,
        roughness: .31,
        metalness: .08,
        transparent: true,
        opacity: 1
      });
      const torus = new THREE.Mesh(new THREE.TorusGeometry(def.r, def.tube || .16, 30, 120), material);
      torus.rotation.x = Math.PI / 2;
      group.add(torus);

      const edge = new THREE.Mesh(
        new THREE.TorusGeometry(def.r + .015, .016, 8, 120),
        new THREE.MeshBasicMaterial({ color: 0xf5ffe7, transparent: true, opacity: .42 })
      );
      edge.rotation.x = Math.PI / 2;
      edge.position.y = .105;
      group.add(edge);

      const inner = new THREE.Mesh(
        new THREE.CircleGeometry(def.r * .77, 64),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: .052,
          side: THREE.DoubleSide,
          depthWrite: false
        })
      );
      inner.rotation.x = -Math.PI / 2;
      inner.position.y = .012;
      group.add(inner);

      const halo = new THREE.Mesh(
        new THREE.RingGeometry(def.r * .84, def.r * .96, 64),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: .11,
          side: THREE.DoubleSide,
          depthWrite: false
        })
      );
      halo.rotation.x = -Math.PI / 2;
      halo.position.y = .02;
      group.add(halo);

      const symbol = makeSymbol(def.id);
      symbol.position.y = def.id === "resume" ? .86 : 1.05;
      symbol.userData.baseY = symbol.position.y;
      group.add(symbol);

      group.position.set(def.x, .34, def.z);
      group.userData.project = def.id;
      group.userData.baseY = .34;
      group.userData.phase = Math.random() * Math.PI * 2;
      group.userData.material = material;
      group.userData.edge = edge;
      group.userData.inner = inner;
      group.userData.halo = halo;
      group.userData.symbol = symbol;
      group.userData.radius = def.r;
      scene.add(group);
      return group;
    }

    function addPoolArchitecture() {
      tileMaterial = makeTileMaterial();
      const bottom = new THREE.Mesh(new THREE.PlaneGeometry(21.2, 17.2), tileMaterial);
      bottom.rotation.x = -Math.PI / 2;
      bottom.position.y = -4.45;
      scene.add(bottom);

      const back = new THREE.Mesh(new THREE.PlaneGeometry(21.2, 4.7), tileMaterial);
      back.position.set(0, -2.28, -8.55);
      scene.add(back);

      const left = new THREE.Mesh(new THREE.PlaneGeometry(17.2, 4.7), tileMaterial);
      left.rotation.y = Math.PI / 2;
      left.position.set(-10.55, -2.28, 0);
      scene.add(left);

      const right = new THREE.Mesh(new THREE.PlaneGeometry(17.2, 4.7), tileMaterial);
      right.rotation.y = -Math.PI / 2;
      right.position.set(10.55, -2.28, 0);
      scene.add(right);

      const deckMaterial = new THREE.MeshBasicMaterial({ color: 0x020c1c });
      const deckParts = [
        [22, .38, 2.2, 0, .03, 9.65],
        [22, .38, 2.2, 0, .03, -9.65],
        [2.2, .38, 18, -11.5, .03, 0],
        [2.2, .38, 18, 11.5, .03, 0]
      ];
      deckParts.forEach((part) => {
        const deck = new THREE.Mesh(new THREE.BoxGeometry(part[0], part[1], part[2]), deckMaterial);
        deck.position.set(part[3], part[4], part[5]);
        scene.add(deck);
      });

      const stepMaterial = new THREE.MeshStandardMaterial({ color: 0x07304a, roughness: .55, metalness: .1 });
      for (let index = 0; index < 4; index += 1) {
        const stair = new THREE.Mesh(new THREE.BoxGeometry(2.5, .22, .85), stepMaterial);
        stair.position.set(8.65, -.18 - index * .55, -5.8 + index * .7);
        scene.add(stair);
      }

      const railMaterial = new THREE.MeshBasicMaterial({ color: 0x86fcda, transparent: true, opacity: .25 });
      [-10.98, 10.98].forEach((x) => {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(.025, .7, 16.4), railMaterial);
        rail.position.set(x, .27, 0);
        scene.add(rail);
      });
    }

    function addParticles() {
      const bubbleGeometry = new THREE.BufferGeometry();
      const bubblePositions = [];
      for (let index = 0; index < 170; index += 1) {
        bubblePositions.push(
          (Math.random() - .5) * 19,
          Math.random() * 4.1 - 4.0,
          (Math.random() - .5) * 15
        );
      }
      bubbleGeometry.setAttribute("position", new THREE.Float32BufferAttribute(bubblePositions, 3));
      bubbles = new THREE.Points(
        bubbleGeometry,
        new THREE.PointsMaterial({
          color: 0x9affe3,
          size: .034,
          transparent: true,
          opacity: .42,
          depthWrite: false
        })
      );
      scene.add(bubbles);

      const sparkleGeometry = new THREE.BufferGeometry();
      const sparklePositions = [];
      for (let index = 0; index < 85; index += 1) {
        sparklePositions.push(
          (Math.random() - .5) * 24,
          Math.random() * 8 + .3,
          (Math.random() - .5) * 18
        );
      }
      sparkleGeometry.setAttribute("position", new THREE.Float32BufferAttribute(sparklePositions, 3));
      sparkles = new THREE.Points(
        sparkleGeometry,
        new THREE.PointsMaterial({
          color: 0xdcff79,
          size: .025,
          transparent: true,
          opacity: .46,
          depthWrite: false
        })
      );
      scene.add(sparkles);
    }

    function ringFromObject(object) {
      let node = object;
      while (node && !node.userData.project) node = node.parent;
      return node || null;
    }

    function pointerNdc(event) {
      const rect = canvas.getBoundingClientRect();
      return new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
    }

    function hitTest(event) {
      if (!raycaster || !camera) return null;
      raycaster.setFromCamera(pointerNdc(event), camera);
      const hits = raycaster.intersectObjects(rings, true);
      return hits.length ? ringFromObject(hits[0].object) : null;
    }

    function init() {
      if (initialized) return;
      initialized = true;
      if (!window.THREE || !canvas) {
        if (labelLayer) {
          labelLayer.innerHTML = '<p class="pool-fallback">3D 场景加载失败，请切换到简洁版。</p>';
        }
        return;
      }

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x020d1b, 1);
      if ("outputEncoding" in renderer && THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
      if (THREE.ACESFilmicToneMapping) renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x031526, .022);
      camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, .1, 90);
      raycaster = new THREE.Raycaster();
      pointer = new THREE.Vector2();
      clock = new THREE.Clock();

      scene.add(new THREE.AmbientLight(0x8dd9ff, .3));
      const key = new THREE.DirectionalLight(0xd8f4ff, .72);
      key.position.set(-5, 9, 4);
      scene.add(key);
      const aqua = new THREE.PointLight(0x46cfff, 18, 23, 2);
      aqua.position.set(5.8, 1.3, -1.5);
      scene.add(aqua);
      const coral = new THREE.PointLight(0xff755e, 10, 17, 2);
      coral.position.set(-4.5, 2.1, 2.2);
      scene.add(coral);
      const floorLight = new THREE.PointLight(0x31aeea, 10, 19, 2);
      floorLight.position.set(-3, -3.6, -2);
      scene.add(floorLight);

      addPoolArchitecture();
      water = makeWater();
      scene.add(water);
      rings = ringDefinitions.map(makeRing);
      makeRouteGuide();
      boat = makeBoat();
      addParticles();

      canvas.addEventListener("pointermove", (event) => {
        mouseX = event.clientX / window.innerWidth - .5;
        mouseY = event.clientY / window.innerHeight - .5;
        if (dragStart && lastPointer) {
          orbitTarget -= (event.clientX - lastPointer.x) * .006;
          orbitTarget = clamp(orbitTarget, -.78, .78);
        }
        lastPointer = { x: event.clientX, y: event.clientY };
        const ring = hitTest(event);
        if (ring !== hovered) {
          hovered = ring;
          canvas.classList.toggle("is-pointing", Boolean(ring));
        }
      });

      canvas.addEventListener("pointerdown", (event) => {
        dragStart = { x: event.clientX, y: event.clientY };
        lastPointer = { x: event.clientX, y: event.clientY };
        if (canvas.setPointerCapture) canvas.setPointerCapture(event.pointerId);
      });

      canvas.addEventListener("pointerup", (event) => {
        if (!dragStart) return;
        const movement = Math.hypot(event.clientX - dragStart.x, event.clientY - dragStart.y);
        dragStart = null;
        lastPointer = null;
        if (movement < 8) {
          const ring = hitTest(event);
          if (ring) openProject(ring.userData.project);
        }
      });

      canvas.addEventListener("pointercancel", () => {
        dragStart = null;
        lastPointer = null;
      });

      canvas.addEventListener("wheel", (event) => {
        event.preventDefault();
        zoomTarget = clamp(zoomTarget + event.deltaY * .0023, -2.6, 2.1);
      }, { passive: false });

      labels.concat(projectButtons).forEach((button) => {
        button.addEventListener("click", () => openProject(button.dataset.project));
      });
      closeButton.addEventListener("click", closeProject);
      if (homeButton) homeButton.addEventListener("click", closeProject);
      if (ambientButton) ambientButton.addEventListener("click", toggleAmbient);
      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeProject();
      });
      window.addEventListener("resize", resize);
      resize();
    }

    function resize() {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.fov = window.innerWidth < 700 ? 62 : 43;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    }

    function updateLabels() {
      const rect = canvas.getBoundingClientRect();
      rings.forEach((ring) => {
        const button = labels.find((item) => item.dataset.project === ring.userData.project);
        if (!button) return;
        const pos = ring.position.clone();
        pos.y += ring.userData.project === "resume" ? 1.95 : 2.25;
        pos.project(camera);
        const x = (pos.x * .5 + .5) * rect.width + rect.left;
        const y = (-pos.y * .5 + .5) * rect.height + rect.top;
        const visible = pos.z < 1 && x > 32 && x < window.innerWidth - 32 && y > 52 && y < window.innerHeight - 52;
        const safeX = clamp(x, Math.min(60, window.innerWidth / 2), window.innerWidth - Math.min(60, window.innerWidth / 2));
        button.style.left = `${safeX}px`;
        button.style.top = `${y}px`;
        button.style.opacity = visible && !currentProject ? "1" : "0";
        button.style.pointerEvents = visible && !currentProject ? "auto" : "none";
      });
    }

    function updateCamera(dt, time) {
      const focusRing = focused ? rings.find((ring) => ring.userData.project === focused) : null;
      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let lookX = mouseX * 1.15;
      let lookY = -.3 - mouseY * .55;
      let lookZ = -.5;

      if (voyage && boat) {
        targetX = boat.position.x + .35;
        targetY = 3.05 + Math.sin(time * .36) * .05;
        targetZ = boat.position.z + 5.25;
        lookX = boat.position.x;
        lookY = .48;
        lookZ = boat.position.z - .15;
      } else if (focusRing) {
        const depthShift = focusRing.position.z < 0 ? 5.3 : 5.8;
        targetX = focusRing.position.x + (focusRing.position.x > 2 ? .65 : focusRing.position.x < -2 ? -.65 : .25);
        targetY = 2.78 + Math.sin(time * .35) * .06;
        targetZ = focusRing.position.z + depthShift;
        lookX = focusRing.position.x;
        lookY = .8;
        lookZ = focusRing.position.z;
      } else {
        const mobile = window.innerWidth < 700;
        const radius = (mobile ? 27.5 : 17.8) + zoom * (mobile ? 1.45 : 1.12);
        targetX = Math.sin(orbit) * radius + mouseX * .48;
        targetY = (mobile ? 9.65 : 8.15) - zoom * .47 - mouseY * .3;
        targetZ = Math.cos(orbit) * radius;
      }

      const speed = running && initialized ? 3.3 : 2;
      camera.position.x = damp(camera.position.x, targetX, speed, dt);
      camera.position.y = damp(camera.position.y, targetY, speed, dt);
      camera.position.z = damp(camera.position.z, targetZ, speed, dt);
      camera.lookAt(lookX, lookY, lookZ);
      if (depthLabel) depthLabel.textContent = Math.max(.4, 1.8 + (camera.position.y - 7.15) * .35).toFixed(2);
    }

    function updateBoat(dt, time) {
      if (!boat) return;
      if (voyage) {
        const raw = clamp((time - voyage.started) / voyage.duration, 0, 1);
        const eased = raw * raw * (3 - 2 * raw);
        const point = voyage.curve.getPoint(eased);
        const tangent = voyage.curve.getTangent(clamp(eased + .004, 0, 1));
        boat.position.set(point.x, .45, point.z);
        boat.rotation.z = damp(boat.rotation.z, -tangent.x * .08, 4, dt);
        if (Math.abs(tangent.x) + Math.abs(tangent.z) > .001) {
          boat.rotation.y = Math.atan2(tangent.x, tangent.z);
        }
        boat.userData.wake.children.forEach((ring, index) => {
          ring.material.opacity = .19 - index * .035 + Math.sin(time * 2.2 + index) * .025;
          const pulse = 1 + Math.sin(time * 1.7 + index * .8) * .045;
          ring.scale.set(pulse, 1.55 * pulse, pulse);
        });
        if (raw >= 1) {
          const finished = voyage;
          voyage = null;
          boat.rotation.z = 0;
          if (voyagePanel) voyagePanel.classList.remove("show");
          if (finished.mode === "project") {
            showProjectPanel(finished.destination);
          } else {
            experience.classList.remove("pool-focus", "pool-travel");
          }
        }
      } else {
        boat.position.y = .45 + Math.sin(time * 1.05) * .028;
        boat.rotation.z = Math.sin(time * .7) * .025;
        boat.rotation.x = Math.sin(time * .48) * .012;
        boat.userData.wake.children.forEach((ring, index) => {
          ring.material.opacity = currentProject ? .1 - index * .025 : .045 - index * .012;
          const pulse = 1 + Math.sin(time * .8 + index) * .025;
          ring.scale.set(pulse, 1.55 * pulse, pulse);
        });
      }
    }

    function updateRings(dt, time) {
      rings.forEach((ring, index) => {
        const isFocused = focused === ring.userData.project;
        const isHovered = hovered === ring;
        const dimmed = Boolean(focused && !isFocused);
        const targetScale = isFocused ? 1.24 : isHovered ? 1.075 : dimmed ? .83 : 1;
        const scale = damp(ring.scale.x, targetScale, 5.4, dt);
        ring.scale.setScalar(scale);
        const targetOpacity = dimmed ? .22 : 1;
        ring.userData.material.opacity = damp(ring.userData.material.opacity, targetOpacity, 4, dt);
        ring.userData.edge.material.opacity = damp(ring.userData.edge.material.opacity, dimmed ? .06 : .42, 4, dt);
        ring.userData.inner.material.opacity = damp(ring.userData.inner.material.opacity, dimmed ? .012 : .052, 4, dt);
        ring.userData.halo.material.opacity = damp(ring.userData.halo.material.opacity, dimmed ? .025 : .11, 4, dt);
        ring.position.y = ring.userData.baseY + Math.sin(time * 1.08 + ring.userData.phase) * .068;
        ring.rotation.z = Math.sin(time * .24 + index * 1.31) * (isFocused ? .018 : .048);
        ring.rotation.y = Math.sin(time * .17 + index * .82) * (isFocused ? .016 : .052);
        const symbol = ring.userData.symbol;
        symbol.position.y = symbol.userData.baseY + Math.sin(time * 1.42 + index) * .065;
        symbol.rotation.y = Math.sin(time * .3 + index) * (ring.userData.project === "resume" ? .16 : .08);
        symbol.rotation.z = Math.sin(time * .38 + index * 1.7) * .025;
      });
    }

    function frame() {
      if (!running) return;
      const dt = Math.min(clock.getDelta(), .05);
      const time = clock.elapsedTime;
      orbit = damp(orbit, orbitTarget, 4.5, dt);
      zoom = damp(zoom, zoomTarget, 3.6, dt);
      water.material.uniforms.uTime.value = time;
      tileMaterial.uniforms.uTime.value = time;
      updateCamera(dt, time);
      updateBoat(dt, time);
      updateRings(dt, time);
      bubbles.rotation.y = time * .007;
      bubbles.position.y = Math.sin(time * .16) * .08;
      sparkles.rotation.y = -time * .004;
      sparkles.position.y = Math.sin(time * .21) * .06;
      updateLabels();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      init();
      if (!renderer || running) return;
      running = true;
      clock.getDelta();
      if (depthLabel) depthLabel.textContent = "01.80";
      frame();
      if (!experience.classList.contains("pool-loaded")) {
        setTimeout(() => {
          experience.classList.add("pool-loaded");
          experience.setAttribute("aria-hidden", "false");
        }, 650);
      } else {
        experience.setAttribute("aria-hidden", "false");
      }
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      if (dragStart) {
        dragStart = null;
        lastPointer = null;
      }
      stopAmbient();
    }

    function layoutFor(id) {
      if (id === "resume") {
        return `
          <div class="panel-art is-document">
            <strong>Marketing<br>× Product</strong>
            <em>CV</em>
          </div>`;
      }
      const data = projectData[id];
      return `<div class="panel-art"><img src="${data.image}" alt="${data.title} 项目视觉"></div>`;
    }

    function resumeContent(data) {
      const sections = data.sections.map((section) => `
        <section class="resume-capsule-section">
          <h4>${section.label}</h4>
          ${section.items.map((item) => `
            <article class="resume-capsule-entry">
              <time>${item[0]}</time>
              <div>
                <b>${item[1]}</b>
                <span>${item[2]}</span>
                ${item[3] ? `<p>${item[3]}</p>` : ""}
              </div>
            </article>
          `).join("")}
        </section>
      `).join("");
      return `
        ${layoutFor("resume")}
        <div class="panel-kicker">${data.kicker}</div>
        <h3>${data.title}<br><em>${data.subtitle}</em></h3>
        <div class="panel-meta">${data.meta}</div>
        <p>${data.body}</p>
        <div class="resume-capsule-stats">
          ${data.summaryStats.map((stat) => `<div><b>${stat[0]}</b><span>${stat[1]}</span><small>${stat[2]}</small></div>`).join("")}
        </div>
        ${sections}
        <section class="resume-capsule-section">
          <h4>SKILLS / 技能</h4>
          <div class="resume-capsule-skills">${data.skills.map((skill) => `<span>${skill}</span>`).join("")}</div>
        </section>
        <section class="resume-capsule-section">
          <h4>HONORS / 荣誉</h4>
          <ul class="resume-capsule-honors">${data.honors.map((honor) => `<li>${honor}</li>`).join("")}</ul>
        </section>
        <div class="panel-links">${data.links.map((link) => `<a href="${link[1]}" target="_blank" rel="noreferrer">${link[0]} ↗</a>`).join("")}</div>
      `;
    }

    function startVoyage(id, mode) {
      if (!boat) return;
      const routeMode = mode || "project";
      const data = projectData[id];
      if (routeMode === "project" && !data) return;
      if (routeMode === "project" && currentProject === id && panel.classList.contains("open")) return;

      const from = boat.position.clone();
      let target = new THREE.Vector3(-1.65, .45, 6.35);
      let routeNumber = 0;
      if (routeMode === "project") {
        const ring = rings.find((item) => item.userData.project === id);
        if (!ring) return;
        routeNumber = routeOrder.indexOf(id);
        target = new THREE.Vector3(
          ring.position.x + (id === "ads" ? -.25 : .2),
          .45,
          ring.position.z + ring.userData.radius + .62
        );
      }

      const midpoint = from.clone().lerp(target, .5);
      const direction = target.clone().sub(from);
      const side = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
      const bend = routeMode === "project" ? (routeNumber % 2 === 0 ? .7 : -.7) : .38;
      midpoint.addScaledVector(side, bend);
      midpoint.z += .24;
      const curve = new THREE.CatmullRomCurve3([from, midpoint, target], false, "centripetal");
      const distance = from.distanceTo(target);
      voyage = {
        curve,
        destination: id,
        mode: routeMode,
        started: clock.elapsedTime,
        duration: clamp(1.35 + distance * .09, 1.8, 2.6)
      };

      if (routeMode === "project") {
        currentProject = id;
        focused = id;
        if (voyageTitle) voyageTitle.textContent = `${String(routeNumber + 1).padStart(2, "0")} / ${data.title}`;
        if (voyageMeta) voyageMeta.textContent = `${data.subtitle} · FOLLOW THE BLUE LANE`;
      } else {
        currentProject = "";
        focused = null;
        if (voyageTitle) voyageTitle.textContent = "泳池入口";
        if (voyageMeta) voyageMeta.textContent = "RETURNING TO THE SURFACE";
      }
      if (voyagePanel) voyagePanel.classList.add("show");
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
      experience.classList.add("pool-focus", "pool-travel");
    }

    function showProjectPanel(id) {
      const data = projectData[id];
      if (!data) return;
      const content = id === "resume"
        ? resumeContent(data)
        : `
        ${layoutFor(id)}
        <div class="panel-kicker">${data.kicker}</div>
        <h3>${data.title}<br><em>${data.subtitle}</em></h3>
        <div class="panel-meta">${data.meta}</div>
        <p>${data.body}</p>
        <ul>${data.points.map((point) => `<li>${point}</li>`).join("")}</ul>
        <div class="panel-links">${data.links.map((link) => `<a href="${link[1]}" target="_blank" rel="noreferrer">${link[0]} ↗</a>`).join("")}</div>
      `;
      const routeIndex = routeOrder.indexOf(id);
      const nextId = routeOrder[routeIndex + 1] || "home";
      const nextData = projectData[nextId];
      const nextMarkup = nextData
        ? `<button class="panel-next" type="button" data-next="${nextId}">
            <span>NEXT / ${String(routeIndex + 2).padStart(2, "0")}</span>
            <b>乘船前往 ${nextData.title}</b>
            <i>→</i>
          </button>`
        : `<button class="panel-next" type="button" data-next="home">
            <span>END OF ROUTE</span>
            <b>回到泳池入口</b>
            <i>↺</i>
          </button>`;
      panelBody.innerHTML = `${content}${nextMarkup}`;
      panelBody.querySelector("[data-next]").addEventListener("click", (event) => {
        const next = event.currentTarget.dataset.next;
        if (next === "home") closeProject();
        else openProject(next);
      });
      if (panelIndex) panelIndex.textContent = `STOP ${String(routeIndex + 1).padStart(2, "0")} / 04`;
      projectButtons.forEach((button) => button.classList.toggle("active", button.dataset.project === id));
      panel.classList.add("open");
      panel.setAttribute("aria-hidden", "false");
      experience.classList.add("pool-focus");
      experience.classList.remove("pool-travel");
      panelBody.scrollTop = 0;
    }

    function openProject(id) {
      startVoyage(id, "project");
    }

    function closeProject() {
      if (!currentProject && !voyage) return;
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
      projectButtons.forEach((button) => button.classList.remove("active"));
      canvas.classList.remove("is-pointing");
      hovered = null;
      zoomTarget = 0;
      startVoyage(null, "home");
    }

    function toggleAmbient() {
      if (ambientOn) {
        stopAmbient();
        return;
      }
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioContext = audioContext || new AudioContextClass();
      if (audioContext.state === "suspended") audioContext.resume();
      ambientMaster = audioContext.createGain();
      ambientMaster.gain.setValueAtTime(.0001, audioContext.currentTime);
      ambientMaster.connect(audioContext.destination);
      ambientMaster.gain.exponentialRampToValueAtTime(.7, audioContext.currentTime + 1.2);

      const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 3, audioContext.sampleRate);
      const channel = buffer.getChannelData(0);
      let previous = 0;
      for (let index = 0; index < channel.length; index += 1) {
        const white = Math.random() * 2 - 1;
        previous = previous * .985 + white * .015;
        channel[index] = previous * 2.8;
      }
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      const filter = audioContext.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 420;
      const sourceGain = audioContext.createGain();
      sourceGain.gain.value = .035;
      source.connect(filter).connect(sourceGain).connect(ambientMaster);
      source.start();

      const hum = audioContext.createOscillator();
      const humGain = audioContext.createGain();
      hum.type = "sine";
      hum.frequency.value = 53;
      humGain.gain.value = .008;
      hum.connect(humGain).connect(ambientMaster);
      hum.start();
      ambientNodes = [source, hum];

      ambientOn = true;
      if (ambientButton) {
        ambientButton.setAttribute("aria-pressed", "true");
        ambientButton.querySelector("span").textContent = "AMBIENT ON";
      }
    }

    function stopAmbient() {
      if (!ambientOn) return;
      ambientOn = false;
      if (ambientMaster && audioContext) {
        ambientMaster.gain.cancelScheduledValues(audioContext.currentTime);
        ambientMaster.gain.setTargetAtTime(.0001, audioContext.currentTime, .08);
      }
      ambientNodes.forEach((node) => {
        try { node.stop(audioContext.currentTime + .35); } catch (error) {}
      });
      ambientNodes = [];
      if (ambientButton) {
        ambientButton.setAttribute("aria-pressed", "false");
        ambientButton.querySelector("span").textContent = "AMBIENT";
      }
    }

    return {
      start,
      stop,
      open: openProject,
      close: closeProject,
      isOpen: () => Boolean(currentProject)
    };
  })();

  function setMode(mode, persist, announce) {
    const immersive = mode === "immersive";
    const experience = document.getElementById("pool-experience");
    body.classList.toggle("mode-immersive", immersive);
    body.classList.toggle("mode-clean", !immersive);
    if (experience) experience.setAttribute("aria-hidden", String(!immersive));
    modeButtons.forEach((button) => {
      const active = button.dataset.mode === mode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute("content", immersive ? "#020d1b" : "#f4f0e7");
    if (persist) {
      try { localStorage.setItem("steph-portfolio-mode", mode); } catch (e) {}
    }
    if (immersive) {
      pool.start();
      if (announce) showToast("泳池版：点击水面的作品");
    } else {
      pool.stop();
      pool.close();
      if (announce) showToast("简洁版：回到阅读模式");
    }
  }

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode, true, true));
  });

  const initialMode = params.get("mode") === "immersive"
    ? "immersive"
    : (savedMode === "immersive" ? "immersive" : "clean");
  setMode(initialMode, false, false);
  if (initialMode === "immersive" && params.get("project")) {
    setTimeout(() => pool.open(params.get("project")), 450);
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(() => body.classList.remove("no-transition"));
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  const menu = document.getElementById("nav-links");
  const menuButton = document.getElementById("menu-toggle");
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => menu.classList.toggle("open"));
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => menu.classList.remove("open"));
    });
  }

  const visual = document.querySelector(".hero-visual");
  if (visual) {
    const orbA = visual.querySelector(".orb-a");
    const orbB = visual.querySelector(".orb-b");
    visual.addEventListener("pointermove", (event) => {
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      if (orbA) orbA.style.transform = `translate(${x * 18}px, ${y * 18}px)`;
      if (orbB) orbB.style.transform = `translate(${x * -24}px, ${y * -24}px)`;
    });
    visual.addEventListener("pointerleave", () => {
      if (orbA) orbA.style.transform = "";
      if (orbB) orbB.style.transform = "";
    });
  }
})();
