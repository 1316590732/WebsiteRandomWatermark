function createRandomWatermark() {
	
	const bodyElement = document.body;
	for (let i = 0; i < numberOfWatermarks; i++) {
		const watermark = document.createElement('div');
		watermark.classList.add('watermark-style');
		watermark.style.setProperty('--rotation', `${Math.random() * 180 - 90}deg`);
		const x = Math.random() * (window.innerWidth - 200);
		const y = Math.random() * (window.innerHeight - 200);
		watermark.style.left = `${x}px`;
		watermark.style.top = `${y}px`;
		watermark.textContent = WatermarkInformation;
		bodyElement.appendChild(watermark);

		// 给水印添加动画
		if(WatermarkAnimation){
			watermark.style.animation = 'fill 10s linear infinite, fillDiagonal 20s linear infinite reverse';
		}
	}
}


// 定义全局变量来控制功能开关
var isSelectDisabled = false; // 鼠标选择开关
var isCtrlCDisabled = false; // Ctrl+C复制开关
var isContextMenuDisabled = false; // 右键菜单复制开关

// 存储原始的事件监听器
var originalMousedownListener = null;
var originalKeydownListener = null;
var originalContextmenuListener = null;

document.addEventListener('DOMContentLoaded', function() {
	// 初始化时根据开关状态添加或移除事件监听器
	updateEventListeners();
});

function updateEventListeners() {
	// 更新鼠标选择事件监听器
	if (isSelectDisabled) {
		if (!originalMousedownListener) {
			originalMousedownListener = document.addEventListener('mousedown', preventSelect);
		}
	} else {
		if (originalMousedownListener) {
			document.removeEventListener('mousedown', originalMousedownListener);
			originalMousedownListener = null;
		}
	}

	// 更新Ctrl+C复制事件监听器
	if (isCtrlCDisabled) {
		if (!originalKeydownListener) {
			originalKeydownListener = document.addEventListener('keydown', preventCtrlC);
		}
	} else {
		if (originalKeydownListener) {
			document.removeEventListener('keydown', originalKeydownListener);
			originalKeydownListener = null;
		}
	}

	// 更新右键菜单复制事件监听器
	if (isContextMenuDisabled) {
		if (!originalContextmenuListener) {
			originalContextmenuListener = document.addEventListener('contextmenu', preventContextMenu);
		}
	} else {
		if (originalContextmenuListener) {
			document.removeEventListener('contextmenu', originalContextmenuListener);
			originalContextmenuListener = null;
		}
	}
}

// 功能开关控制函数
function toggleSelect(enable) {
	isSelectDisabled = enable;
	updateEventListeners();
}

function toggleCtrlC(enable) {
	isCtrlCDisabled = enable;
	updateEventListeners();
}

function toggleContextMenu(enable) {
	isContextMenuDisabled = enable;
	updateEventListeners();
}

// 辅助函数
function preventSelect() {
	return false;
}

function preventCtrlC(e) {
	if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
		e.preventDefault();
	}
}

function preventContextMenu(e) {
	e.preventDefault();
}

function toggleCtrlCMessage(enable = false, message) {
  isCtrlCDisabled = enable;
  ctrlCMessage = message;
  
  // 如果启用了复制时的提示，则添加事件监听器，否则移除
  if (enable) {
    document.addEventListener('keydown', handleCtrlC);
  } else {
    document.removeEventListener('keydown', handleCtrlC);
  }
}

function handleCtrlC(event) {
  if (isCtrlCDisabled && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c') {
    alert(ctrlCMessage);
    event.preventDefault();
  }
}


//-----------------------------------------

// 启动屏幕水印
window.onload = createRandomWatermark;

// 水印动画
var WatermarkAnimation = true;
// 水印信息
var WatermarkInformation = 'http://www.quanzhangongchengshi.com/'

//你希望创建的水印数量
var numberOfWatermarks = 5

// 示例：启动用户复制网页内容的提示语弹窗,ctrl+c的时候弹出窗口
// toggleCtrlCMessage(true, '自定义的禁止复制提示语');

// 示例：禁止用户复制网页内容
// toggleSelect(true);
// toggleCtrlC(true);
// toggleContextMenu(true);

