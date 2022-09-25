// 创建画布，并添加到body中
const the_canvas = document.createElement("canvas"); // 画布
const config = get_config_option(); // 配置
const canvas_id = "c_n" + config.l; // canvas id
const context = the_canvas.getContext("2d");
let canvas_width;
let canvas_height;
let frame_func =
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function(func) {
		window.setTimeout(func, 1000 / 45);
	};
const random = Math.random;
let current_point = {
	x: null, // 当前鼠标x
	y: null, // 当前鼠标y
	max: 20000,
};
let all_array;
the_canvas.id = canvas_id;
the_canvas.style.cssText =
	"position:fixed;top:0;left:0;z-index:" + config.z + ";opacity:" + config.o;
get_by_tagname("body")[0].appendChild(the_canvas);
// 初始化画布大小

set_canvas_size(), (window.onresize = set_canvas_size);
// 当时鼠标位置存储，离开的时候，释放当前位置信息
(window.onmousemove = function(e) {
	(e = e || window.event),
		(current_point.x = e.clientX),
		(current_point.y = e.clientY);
}),
	(window.onmouseout = function() {
		(current_point.x = null), (current_point.y = null);
	});
// 随机生成config.n条线位置信息

let random_lines = []
for (let i = 0; config.n > i; i++) {
	const x = random() * canvas_width; // 随机位置
	const y = random() * canvas_height;
	const xa = 2 * random() - 1; // 随机运动方向
	const ya = 2 * random() - 1;
	random_lines.push({
		x,
		y,
		xa,
		ya,
		max: 6000, // 沾附距离
	});
}
all_array = random_lines.concat([current_point]);

function get_attribute(attr, default_value) {
	return localStorage.getItem(attr) || default_value;
}

// 获取配置参数
function get_config_option() {
	let color = "20,20,20";
	if (localStorage.getItem("vitepress-theme-appearance") == "dark") {
		color = "230,230,230";
	}
	return {
		z: get_attribute("zIndex", -1), // z-index
		o: get_attribute("opacity", 0.7), // opacity
		c: get_attribute("color", color), // color
		n: get_attribute("count", 99), // count
	};
}

// 封装方法，压缩之后减少文件大小
function get_by_tagname(name) {
	return document.getElementsByTagName(name);
}

// 设置canvas的高宽
function set_canvas_size() {
	(canvas_width = the_canvas.width =
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth),
		(canvas_height = the_canvas.height =
			window.innerHeight ||
			document.documentElement.clientHeight ||
			document.body.clientHeight);
}

// 绘制过程
export function draw_canvas() {
	context.clearRect(0, 0, canvas_width, canvas_height);
	// 随机的线条和当前位置联合数组
	let e, i, d, x_dist, y_dist, dist; // 临时节点
	// 遍历处理每一个点
	random_lines.forEach(function(r, idx) {
		(r.x += r.xa),
			(r.y += r.ya), // 移动
			(r.xa *= r.x > canvas_width || r.x < 0 ? -1 : 1),
			(r.ya *= r.y > canvas_height || r.y < 0 ? -1 : 1), // 碰到边界，反向反弹
			context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); // 绘制一个宽高为1的点
		// 从下一个点开始
		for (i = idx + 1; i < all_array.length; i++) {
			e = all_array[i];
			// 不是当前点
			if (e.x !== null && e.y !== null) {
				(x_dist = r.x - e.x), // x轴距离 l
					(y_dist = r.y - e.y), // y轴距离 n
					(dist = x_dist * x_dist + y_dist * y_dist); // 总距离, m
				dist < e.max &&
					(e === current_point &&
						dist >= e.max / 2 &&
						((r.x -= 0.03 * x_dist), (r.y -= 0.03 * y_dist)), // 靠近的时候加速
						(d = (e.max - dist) / e.max),
						context.beginPath(),
						(context.lineWidth = d / 2),
						(context.strokeStyle = "rgba(" + config.c + "," + (d + 0.2) + ")"),
						context.moveTo(r.x, r.y),
						context.lineTo(e.x, e.y),
						context.stroke());
			}
		}
	}),
		frame_func(draw_canvas);
}
