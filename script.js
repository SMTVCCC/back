// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动导航
    initSmoothScroll();
    
    // 添加滚动效果
    initScrollEffects();
    
    // 添加鼠标移动效果
    initMouseEffects();
    
    // 添加打字机效果到标题
    initTypewriterEffect();
});

// 平滑滚动导航
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // 如果是页面间导航链接（如index.html），不阻止默认行为
            if (targetId && (targetId.includes('.html') || targetId.includes('http'))) {
                return; // 允许默认的页面跳转行为
            }
            
            e.preventDefault();
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滚动效果
function initScrollEffects() {
    const sections = document.querySelectorAll('.section');
    
    // 创建 Intersection Observer 来检测元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 为每个部分添加初始样式和观察
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// 鼠标移动效果
function initMouseEffects() {
    const container = document.querySelector('.container');
    
    container.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.feature-card, .info-card');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;
            
            const distanceX = Math.abs(e.clientX - cardX) / window.innerWidth;
            const distanceY = Math.abs(e.clientY - cardY) / window.innerHeight;
            
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const intensity = Math.max(0, 1 - distance * 2);
            
            card.style.transform = `translateY(${-intensity * 5}px) rotate3d(${mouseY - 0.5}, ${mouseX - 0.5}, 0, ${intensity * 2}deg)`;
            card.style.boxShadow = `0 ${intensity * 10}px ${intensity * 20}px rgba(255, 107, 53, ${intensity * 0.3})`;
        });
    });
    
    // 鼠标离开时重置效果
    container.addEventListener('mouseleave', function() {
        const cards = document.querySelectorAll('.feature-card, .info-card');
        
        cards.forEach(card => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}

// 打字机效果
function initTypewriterEffect() {
    const heroText = document.querySelector('.poster-overlay h2');
    if (!heroText) return;
    
    const text = heroText.textContent;
    heroText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // 延迟开始打字效果
    setTimeout(typeWriter, 1000);
}

// 添加随机闪烁效果
function addRandomFlicker() {
    setInterval(() => {
        const randomOpacity = Math.random() * 0.1 + 0.02;
        const flicker = document.querySelector('.flicker');
        if (flicker) {
            flicker.style.opacity = randomOpacity;
        }
    }, 3000);
}

// 初始化随机闪烁
addRandomFlicker();

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 彩蛋系统
let easterEggTimer = null;
let easterEggCooldown = false;
let consecutiveMisses = 0;

function initEasterEgg() {
    // 检查当前页面是否为教程页面，如果是则不触发彩蛋
    if (window.location.pathname.includes('tutorial.html')) {
        return;
    }
    
    // 创建彩蛋图片元素
    const easterEgg = document.createElement('img');
    easterEgg.id = 'easter-egg';
    easterEgg.src = 'sp.PNG';
    easterEgg.alt = 'Easter Egg';
    easterEgg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        max-width: 300px;
        max-height: 300px;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.8));
    `;
    document.body.appendChild(easterEgg);
    
    // 开始彩蛋计时器
    startEasterEggTimer();
}

function startEasterEggTimer() {
    easterEggTimer = setInterval(() => {
        if (!easterEggCooldown) {
            triggerEasterEgg();
        }
    }, 3000);
}

function triggerEasterEgg() {
    // 计算触发概率：第一次50%，如果没触发则第二次100%
    const triggerChance = consecutiveMisses > 0 ? 1 : 0.5;
    const shouldTrigger = Math.random() < triggerChance;
    
    if (shouldTrigger) {
        showEasterEgg();
        consecutiveMisses = 0; // 重置连续未触发计数
    } else {
        consecutiveMisses++;
    }
}

function showEasterEgg() {
    const easterEgg = document.getElementById('easter-egg');
    if (!easterEgg) return;
    
    // 设置冷却期
    easterEggCooldown = true;
    
    // 显示动画
    easterEgg.style.opacity = '1';
    easterEgg.style.transform = 'translate(-50%, -50%) scale(1)';
    
    // 添加闪烁效果
    let flashCount = 0;
    const flashInterval = setInterval(() => {
        easterEgg.style.filter = flashCount % 2 === 0 
            ? 'drop-shadow(0 0 30px rgba(255, 107, 53, 1))'
            : 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.8))';
        
        flashCount++;
        if (flashCount >= 6) {
            clearInterval(flashInterval);
            
            // 隐藏图片
            setTimeout(() => {
                easterEgg.style.opacity = '0';
                easterEgg.style.transform = 'translate(-50%, -50%) scale(0)';
                
                // 10秒冷却期
                setTimeout(() => {
                    easterEggCooldown = false;
                }, 10000);
            }, 1000);
        }
    }, 200);
}

// 语言切换系统
let currentLanguage = 'zh'; // 默认中文

// 语言文本映射
const languageTexts = {
    en: {
        // 页面元数据
        htmlLang: 'en',
        title: 'Minecraft Backroom Modpack',
        downloadTitle: 'Download Launcher - Minecraft Backroom Modpack',
        
        // 导航栏
        download: 'Download',
        about: 'About',
        languageToggle: '中文',
        backToHome: 'Back to Home',
        
        // Logo
        subtitle: 'Minecraft Modpack',
        
        // 海报区域
        posterAlt: 'Backroom Modpack Poster',
        
        // 下载部分
        downloadSectionTitle: 'Download & Watch',
        stepsTitle: 'Steps',
        step1: 'Download the Launcher',
        step2: 'Watch Tutorial Video',
        downloadBtn1: 'Download Launcher',
        downloadBtn2: 'Watch Tutorial',
        downloadBtn3: 'Skin Settings',
        
        // 下载页面
        downloadPageTitle: 'Download Launcher',
        downloadPageSubtitle: 'Choose your operating system to download the Backroom Modpack launcher',
        windowsVersion: 'Windows Version',
        windowsCompatible: 'Compatible with Windows 10/11',
        macVersion: 'Mac Version',
        macCompatible: 'Compatible with macOS 10.14+',
        fileSize: 'File Size:',
        version: 'Version:',
        downloadForWindows: 'Download for Windows',
        downloadForMac: 'Download for Mac',
        installationInstructions: 'Installation Instructions',
        step1Title: 'Download the Launcher',
        step1Desc: 'Click the download button for your operating system above',
        step2Title: 'Run the Installer',
        step2Desc: 'Locate the downloaded file and run the installer',
        step3Title: 'Follow Setup Wizard',
        step3Desc: 'Follow the on-screen instructions to complete installation',
        step4Title: 'Launch and Play',
        step4Desc: 'Start the launcher and begin your Backroom adventure!',
        
        // 注意事项
        warningTitle: '⚠️ Important Notes',
        warning1: 'This modpack contains horror elements, play with caution',
        warning2: 'Recommended for 4-6 players',
        warning3: 'Use in-game voice chat system',
        warning4: 'Stop playing immediately if you feel uncomfortable',
        warning5: 'For any issues, search on Bilibili',
        
        // 页脚
        footer: '© 2025 Backroom Modpack | Minecraft Modding Community',
        
        // 教程页面
        tutorialTitle: 'Tutorial Guide',
        launcherErrorTitle: 'Launcher Error Solutions',
        modpackVideoTitle: 'Modpack Installation Video',
        skinVideoTitle: 'Skin Settings Video',
        videoDescription: 'Click to play the tutorial video',
        videoInstructions: 'Watch video to solve errors',
        launcherErrorInstruction1: 'Watch video to solve errors',
        modpackInstruction1: 'Download and install the launcher from the download page',
        modpackInstruction2: 'Launch the Backroom Modpack launcher',
        modpackInstruction3: 'Wait for mods and resources to download automatically',
        modpackInstruction4: 'Start your Backroom adventure!',
        skinInstruction1: 'Access the skin settings menu in the launcher',
        skinInstruction2: 'Customize your character\'s appearance',
        skinInstruction3: 'Apply custom skins and textures',
        skinInstruction4: 'Save your preferences for future sessions',

    },
    zh: {
        // 页面元数据
        htmlLang: 'zh-CN',
        title: '我的世界 Backroom 整合包',
        downloadTitle: '下载启动器 - 我的世界 Backroom 整合包',
        
        // 导航栏
        download: '下载',
        about: '关于',
        languageToggle: 'English',
        backToHome: '返回主页',
        
        // Logo
        subtitle: '我的世界整合包',
        
        // 海报区域
        posterAlt: 'Backroom 整合包海报',
        
        // 下载部分
        downloadSectionTitle: '下载/观看',
        stepsTitle: '步骤',
        step1: '下载启动器',
        step2: '观看教程视频',
        downloadBtn1: '下载启动器',
        downloadBtn2: '观看教程',
        downloadBtn3: '皮肤设置',
        
        // 下载页面
        downloadPageTitle: '下载启动器',
        downloadPageSubtitle: '选择您的操作系统以下载 Backroom 整合包启动器',
        windowsVersion: 'Windows 版本',
        windowsCompatible: '兼容 Windows 10/11',
        macVersion: 'Mac 版本',
        macCompatible: '兼容 macOS 10.14+',
        fileSize: '文件大小:',
        version: '版本:',
        downloadForWindows: '下载 Windows 版',
        downloadForMac: '下载 Mac 版',
        installationInstructions: '安装说明',
        step1Title: '下载启动器',
        step1Desc: '点击上方对应操作系统的下载按钮',
        step2Title: '运行安装程序',
        step2Desc: '找到下载的文件并运行安装程序',
        step3Title: '跟随安装向导',
        step3Desc: '按照屏幕上的指示完成安装',
        step4Title: '启动并游玩',
        step4Desc: '启动启动器，开始您的 Backroom 冒险！',
        
        // 注意事项
        warningTitle: '⚠️ 注意事项',
        warning1: '本整合包包含恐怖元素，请谨慎游玩',
        warning2: '推荐4-6人游玩',
        warning3: '使用游戏内语音聊天系统',
        warning4: '如感不适请立即停止游玩',
        warning5: '遇到问题请去B站搜索',
        
        // 页脚
        footer: '© 2025 Backroom 整合包 | 我的世界模组社区',
        
        // 教程页面
        tutorialTitle: '教程指南',
        launcherErrorTitle: '启动器报错解决方法',
        modpackVideoTitle: '整合包安装视频',
        skinVideoTitle: '皮肤设置视频',
        videoDescription: '点击即可播放教程视频',
        videoInstructions: '观看视频解决报错',
        launcherErrorInstruction1: '观看视频解决报错',
        modpackInstruction1: '从下载页面下载并安装启动器',
        modpackInstruction2: '启动 Backroom 整合包启动器',
        modpackInstruction3: '等待模组和资源自动下载',
        modpackInstruction4: '开始您的 Backroom 冒险！',
        skinInstruction1: '在启动器中访问皮肤设置菜单',
        skinInstruction2: '自定义您的角色外观',
        skinInstruction3: '应用自定义皮肤和纹理',
        skinInstruction4: '保存您的偏好设置以备将来使用',

    }
};

function initLanguageToggle() {
    const toggleBtn = document.getElementById('language-toggle');
    
    // 页面加载时自动设置为中文
    currentLanguage = 'zh';
    updatePageLanguage();
    
    // 更新按钮文本
    if (toggleBtn) {
        toggleBtn.textContent = languageTexts[currentLanguage].languageToggle;
    }
    
    toggleBtn.addEventListener('click', function() {
        // 切换语言
        currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
        
        // 更新页面文本
        updatePageLanguage();
        
        // 更新按钮文本
        toggleBtn.textContent = languageTexts[currentLanguage].languageToggle;
    });
}

function updatePageLanguage() {
    const texts = languageTexts[currentLanguage];
    
    // 更新页面元数据
    document.documentElement.lang = texts.htmlLang;
    
    // 根据当前页面设置标题
    if (window.location.pathname.includes('download.html')) {
        document.title = texts.downloadTitle;
    } else {
        document.title = texts.title;
    }
    
    // 更新导航栏
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#download' || link.textContent.includes('Download') || link.textContent.includes('下载')) {
            link.textContent = texts.download;
        } else if (href === '#about' || link.textContent.includes('About') || link.textContent.includes('关于')) {
            link.textContent = texts.about;
        } else if (link.textContent.includes('Back to Home') || link.textContent.includes('返回主页')) {
            link.textContent = texts.backToHome;
        }
    });
    
    // 更新语言切换按钮
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.textContent = texts.languageToggle;
    }
    
    // 更新Logo区域
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        subtitle.textContent = texts.subtitle;
    }
    
    // 更新海报区域
    const poster = document.querySelector('.poster');
    if (poster) {
        poster.alt = texts.posterAlt;
    }
    
    // 更新主页下载部分
    const downloadTitle = document.querySelector('#download h2');
    if (downloadTitle) {
        downloadTitle.textContent = texts.downloadSectionTitle;
    }
    
    const stepsTitle = document.querySelector('#download h3');
    if (stepsTitle) {
        stepsTitle.textContent = texts.stepsTitle;
    }
    
    const stepItems = document.querySelectorAll('#download li');
    if (stepItems.length >= 2) {
        stepItems[0].textContent = texts.step1;
        stepItems[1].textContent = texts.step2;
    }
    
    const downloadBtns = document.querySelectorAll('.download-btn');
    if (downloadBtns.length >= 3) {
        downloadBtns[0].textContent = texts.downloadBtn1;
        downloadBtns[1].textContent = texts.downloadBtn2;
        downloadBtns[2].textContent = texts.downloadBtn3;
    }
    
    // 更新下载页面内容
    const downloadPageTitle = document.querySelector('.download-page-title');
    if (downloadPageTitle) {
        downloadPageTitle.textContent = texts.downloadPageTitle;
    }
    
    const windowsVersion = document.querySelector('.windows-version');
    if (windowsVersion) {
        windowsVersion.textContent = texts.windowsVersion;
    }
    
    const windowsCompatible = document.querySelector('.windows-compatible');
    if (windowsCompatible) {
        windowsCompatible.textContent = texts.windowsCompatible;
    }
    
    const macVersion = document.querySelector('.mac-version');
    if (macVersion) {
        macVersion.textContent = texts.macVersion;
    }
    
    const macCompatible = document.querySelector('.mac-compatible');
    if (macCompatible) {
        macCompatible.textContent = texts.macCompatible;
    }
    
    const downloadWindowsBtn = document.querySelector('.download-windows-btn');
    if (downloadWindowsBtn) {
        downloadWindowsBtn.textContent = texts.downloadForWindows;
    }
    
    const downloadMacBtn = document.querySelector('.download-mac-btn');
    if (downloadMacBtn) {
        downloadMacBtn.textContent = texts.downloadForMac;
    }
    

    
    const installationInstructions = document.querySelector('.installation-instructions');
    if (installationInstructions) {
        installationInstructions.textContent = texts.installationInstructions;
    }
    
    const stepTitles = document.querySelectorAll('.step-title');
    if (stepTitles.length >= 4) {
        stepTitles[0].textContent = texts.step1Title;
        stepTitles[1].textContent = texts.step2Title;
        stepTitles[2].textContent = texts.step3Title;
        stepTitles[3].textContent = texts.step4Title;
    }
    
    const stepDescs = document.querySelectorAll('.step-desc');
    if (stepDescs.length >= 4) {
        stepDescs[0].textContent = texts.step1Desc;
        stepDescs[1].textContent = texts.step2Desc;
        stepDescs[2].textContent = texts.step3Desc;
        stepDescs[3].textContent = texts.step4Desc;
    }
    
    // 更新注意事项
    const warningTitle = document.querySelector('#about h3');
    if (warningTitle) {
        warningTitle.textContent = texts.warningTitle;
    }
    
    const warningItems = document.querySelectorAll('#about li');
    if (warningItems.length >= 5) {
        warningItems[0].textContent = texts.warning1;
        warningItems[1].textContent = texts.warning2;
        warningItems[2].textContent = texts.warning3;
        warningItems[3].textContent = texts.warning4;
        warningItems[4].textContent = texts.warning5;
    }
    
    // 更新页脚
    const footer = document.querySelector('.footer p');
    if (footer) {
        footer.textContent = texts.footer;
    }
    
    // 更新教程页面元素
    const tutorialMainTitle = document.querySelector('.tutorial-main-title');
    if (tutorialMainTitle) {
        tutorialMainTitle.textContent = texts.tutorialTitle;
    }
    
    const launcherErrorTitle = document.querySelector('.launcher-error-title');
    if (launcherErrorTitle) {
        launcherErrorTitle.textContent = texts.launcherErrorTitle;
    }
    
    const modpackVideoTitle = document.querySelector('.modpack-video-title');
    if (modpackVideoTitle) {
        modpackVideoTitle.textContent = texts.modpackVideoTitle;
    }
    
    const skinVideoTitle = document.querySelector('.skin-video-title');
    if (skinVideoTitle) {
        skinVideoTitle.textContent = texts.skinVideoTitle;
    }
    
    const videoDescriptions = document.querySelectorAll('.video-description');
    if (videoDescriptions.length >= 2) {
        videoDescriptions[0].textContent = texts.videoDescription;
        videoDescriptions[1].textContent = texts.videoDescription;
    }
    
    const videoInstructions = document.querySelectorAll('.video-instructions');
    if (videoInstructions.length >= 3) {
        videoInstructions[0].textContent = texts.videoInstructions;
        videoInstructions[1].textContent = texts.videoInstructions;
        videoInstructions[2].textContent = texts.videoInstructions;
    }
    
    const instructionItems = document.querySelectorAll('.instruction-item');
    if (instructionItems.length >= 8) {
        instructionItems[0].textContent = texts.modpackInstruction1;
        instructionItems[1].textContent = texts.modpackInstruction2;
        instructionItems[2].textContent = texts.modpackInstruction3;
        instructionItems[3].textContent = texts.modpackInstruction4;
        instructionItems[4].textContent = texts.skinInstruction1;
        instructionItems[5].textContent = texts.skinInstruction2;
        instructionItems[6].textContent = texts.skinInstruction3;
        instructionItems[7].textContent = texts.skinInstruction4;
    }
    

}

// 初始化语言切换系统
initLanguageToggle();

// 初始化彩蛋系统
initEasterEgg();

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // ESC键回到顶部
    if (e.key === 'Escape') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // 数字键快速导航
    if (e.key >= '1' && e.key <= '3') {
        const sections = document.querySelectorAll('.section');
        const index = parseInt(e.key) - 1;
        
        if (sections[index]) {
            const offsetTop = sections[index].offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});