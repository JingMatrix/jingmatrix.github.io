---
created: "2023-12-18T23:37:11+01:00"
modified: "2023-12-19T14:55:36+01:00"
title: "星汉灿烂"
tags: ["思考"]
---

> 题诗曰：星垂黯海升翡翠, 火炼七州啸伏龙。

上诗所题写的便是下面这张国际空间站（ISS）从法国上空拍摄的[照片](https://eol.jsc.nasa.gov/DatabaseImages/ESC/large/ISS067/ISS067-E-327809.JPG)：

![nighttime](https://eol.jsc.nasa.gov/DatabaseImages/ESC/small/ISS067/ISS067-E-327809.JPG)

白居易曾写诗道：“灯火万家城四畔，星河一道水中央。”
在唐朝时，灯火万家与星河一道难以同时在视野中出现，因而后者只能是前者的譬喻。
但如今宇航员可以进入 ISS, 从四百公里的高空来俯瞰地球；而且他们也用相机记录下了上图那般曾让香山居士倾心的想象场景。
那么，如此磅礴而震撼人心的景色是否真实呢？我在搜索整理资料后愿为各位读者驳斥相关质疑，且听我娓娓道来。

## 在哪里可以找到 ISS 拍摄的星空图？

ISS 拍摄的太空照片目前都归档存放在了 [The Gateway to Astronaut Photography of Earth](https://eol.jsc.nasa.gov/)，我们可以通过其提供的[搜索页面](https://eol.jsc.nasa.gov/SearchPhotos/)来检索所有照片。如果想要找到和上文展示照片（[ISS067-E-327809](https://eol.jsc.nasa.gov/SearchPhotos/photo.pl?mission=ISS067&roll=E&frame=327809)）类似的场景，只需要按照地图区域来搜索：通过缩放移动来锁定你感兴趣的地区，仅勾选 `Include Nighttime Images`、 `Include Cataloged with Center Point` 以及 `Include High Oblique and Panorama Imagery` 的过滤条件，再点击 `Search for Photos` 即可。几乎在每个地区都可以找到大量的星空照片，比如这张在[中国大陆与台湾上空拍摄的照片](https://eol.jsc.nasa.gov/SearchPhotos/photo.pl?mission=ISS053&roll=E&frame=15519)。
这里提及的过滤条件是值得注意的，我们不妨做进一步的解释。
所谓 `Daytime` 与 `Nighttime` 的区别在于地球是否遮挡住了照向 ISS 的太阳光，严格来讲是取决所谓的 [sun elevation angle](https://eol.jsc.nasa.gov/FAQ/#sunElevation)。
这两者的区别导致了获取清晰照片所要求的拍摄参数之间的巨大差异，我们在后文会[详细分析](#iss-拍摄地球时的参数定量分析)，并说明选用 `Nighttime` 照片的必要性。
再来看 `Center Point` 这个分类参数，通俗来讲，就是意味着“不一定对准地面”的拍摄角度。
有 `Center Point` 的照片是需要宇航员手持相机拍摄的，而不是 ISS 上固定角度的相机所拍摄的。
[官方解释](https://eol.jsc.nasa.gov/FAQ/#nadir)还提供了这一差别的示意图，不妨参阅全文以加深理解；其中也解释了何为 `Oblique Imagery`，也就是那些可以看出地球边界的照片。

![Center Point](https://eol.jsc.nasa.gov/FAQ/img/nadir.png)

总而言之，上述过滤参数可以较为精确地确保搜索的照片中包含星空。

从网络上我们可以查询到，ISS 从 2000 年 11 月开始就有了执行长期工作的宇航员居住。那么我们能够找到的最早包含星空的照片又是何时呢？从归档图片中搜索，我发现较早的一张是下面这幅在 2001 年 3 月拍摄的[照片](https://eol.jsc.nasa.gov/SearchPhotos/photo.pl?mission=ISS001&roll=E&frame=6783)。因为只有它的[高清版本](https://eol.jsc.nasa.gov/DatabaseImages/ESC/large/ISS001/ISS001-E-6783.JPG)可以看清星星，下面引用的缩略图更多是展示了月球的细节。

![ISS001-E-6783](https://eol.jsc.nasa.gov/DatabaseImages/ESC/small/ISS001/ISS001-E-6783.JPG)

由此可见，从很早开始， ISS 就有能力通过宇航员手持相机拍摄到清晰的星空图，只不过需要感兴趣的读者去自行检索挖掘。


## 能否在 ISS 提供的视频中找到星星呢？

对此我的结论是：除了那些利用归档照片进行后期合成的观赏性视频，否则我们几乎找不到可以看到星空的太空视频。

所谓后期合成的视频，大家可以参考[这一部](https://images.nasa.gov/details/jsc2023m000111_Earth_in_4K_Space_Station_Expedition_67_68_Edition)。
其中很多帧在我看来都“似曾相识”，如同是从归档照片中选取得到。
可能的情况是，拍摄该帧照片的宇航员被要求固定拍摄角度与相机参数，多拍了几张作为制作视频的原始素材。
这样的展示视频主要是为了观赏性，回避读者去归档库中搜寻的繁琐细节。
但是后期合成过程包含了诸多变量，不适用于严谨分析，因此我们暂且搁置不论。
再来看 NASA 提供的 [ISS 镜头直播](https://www.youtube.com/watch?v=P9C25Un7xaM)。
如同视频描述所言，这里的摄像头是固定角度的，应该是对准地面拍摄，不是上文的 `Center Point` 类型，因而看不到星空镜头是合理的。

最后我们来重点分析 NASA 提供的、关于宇航员在 ISS 上工作、生活的视频。
在转入定量分析之前，我们先从一些视频提供的场景来对比分析得到拍摄不到星星的原因。
最常被质疑的便是这条 [Sunita Williams](https://en.wikipedia.org/wiki/Sunita_Williams) 展示 ISS 站内环境的[视频](https://www.youtube.com/watch?v=doN4t5NKW-k)。
比如说下图截取的 [12:17](https://youtu.be/doN4t5NKW-k?feature=shared&t=737) 帧, [质疑者认为](https://yinwang1.substack.com/p/f00)“窗框背后的那些暗部细节”是比星星的亮度要低的，因而在这张截图中没有出现从窗外拍摄到的星星是不合理的。

![frame 12:17](/img/iss_analysis1.png)

对于这个问题，我们暂且不引入定量分析而仅仅进行定性的比较分析，因为那是下一节的内容。
所谓的“窗框”是指<a href="https://en.wikipedia.org/wiki/Cupola_(ISS_module)">穹顶舱</a>的窗框。
我们不妨先看看它在太空中能够清晰成像时的[照片](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/International_Space_Station/Nightpod)：

![Nigthpod](https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2013/11/andre_kuipers_nightpod/13387569-1-eng-GB/Andre_Kuipers_Nightpod_article.jpg)

可以观察到除天窗外的周边窗户都有明显的白色金属镶边。
这一点从它在地面建造时拍摄的[照片](https://commons.wikimedia.org/wiki/File:Copola-innen.jpg)来看更加明显：

![Copola-innen](https://upload.wikimedia.org/wikipedia/commons/4/4c/Copola-innen.jpg)

知道了这一构造后，我们再来观察视频截图，发现白色镶边已经十分暗淡，只能被勉强分辨。
那么为何同一物体的成像会有如此大的差异呢？
这就是拍摄视频的摄像机自动调节曝光的结果，而我们在下一节会解释这种调节的具体参数是多么极端。
另外，我们可以从视频中明显看出这一自动调节曝光的过程，也就是从 [11:29](https://youtu.be/doN4t5NKW-k?feature=shared&t=689) 时开始到 [12:05](https://youtu.be/doN4t5NKW-k?feature=shared&t=725) 结束的视频片段。
其中比较明显的就是下面 [11:44](https://youtu.be/doN4t5NKW-k?feature=shared&t=704) 时的截图，可以看到 Sunita 的额头已经是很难看清，而此时穹顶舱的天窗由于地球反射的太阳光依旧过曝。

![frame 11:44](/img/iss_analysis2.png)

由此不难推断出，为了让天窗取景不过曝，那么人物的成像只会更加暗淡（具体可参见 [11:53](https://youtu.be/doN4t5NKW-k?feature=shared&t=713) 帧，此时已无法看清 Sunita 的眼睛；该静止画面略显骇人，故此处不提供截图）。
现在我们可以来反驳质疑者的论证了：其所认为的暗部细节实际亮度可能并不低（尚未定量分析，因而只说可能）。
关键就在于，其推论是建立在一个需要适应强烈地球反射光而进行自动调节的相机所拍摄的窗框照片之上的，由此得到关于明暗对比的结论自然也是不可靠的。
另外，摄像机自动调整曝光时成像的巨大反差对宇航员来说也是十分有趣的，比如 [Chris Hadfield](https://en.wikipedia.org/wiki/Chris_Hadfield) 就曾把这一过程完整地放到了他的 [Space Oddity  演唱视频](https://youtu.be/KaOC9danxNo?feature=shared&t=251)里，也就是世界上首支在外太空拍摄的 MV。

现在让我们开始对相机拍摄的参数进行定量分析，以便将我们的论证建立在坚实的基础之上。

## ISS 拍摄地球时的参数定量分析

地球的反射光究竟有多强，我没有设备和机会也就无从测量。
但是 ISS 近些年的归档照片保存完整的拍摄时参数，因而可以作为我们定量分析的基础。

我们选用一张类似拍摄 Sunita 视频的[归档照片](https://eol.jsc.nasa.gov/SearchPhotos/photo.pl?mission=ISS068&roll=E&frame=46227)，明显是在 daytime 拍摄的。

![daytime shot](https://eol.jsc.nasa.gov/DatabaseImages/ESC/small/ISS068/ISS068-E-46227.JPG)

我们把它与文章开始提供的、在 nigthtime 拍摄的[照片](https://eol.jsc.nasa.gov/SearchPhotos/photo.pl?mission=ISS067&roll=E&frame=327809)作对比。
下面我们[左（daytime）](https://eol.jsc.nasa.gov/DatabaseCameraFiles/ISS068/ISS068-E-46227.txt)、[右（nightime）](https://eol.jsc.nasa.gov/DatabaseCameraFiles/ISS067/ISS067-E-327809.txt)列举这两张照片的拍摄参数：

```
NASA PHOTO ID		iss068e046227.NEF                       iss067e327809.NEF
GMT					2023:02:04 11:53:14                     2022:09:05 00:16:24
MODEL				NIKON D5 S/N: 3503281                   NIKON D5 S/N: 3503283
NASA SN and Temp	NASA 3503281                            NASA 3503283
Firmware			Ver.N.10                                Ver.N.10
Image Size			5584x3728                               5584x3728
Compression			Nikon NEF Compressed                    Nikon NEF Compressed
Exposure Program	Shutter speed priority AE               Manual
Shutter				1/640                                   1/8
Aperture			14.0                                    1.4
Meter Mode			Multi-segment                           Spot
Shooting Mode		Single-Frame, Auto ISO                  Single-Frame
ISO Speed			200                                     6400
AF Area Mode		Single Area                             Single Area
Focal Length		50.0 mm                                 24.0 mm
Lens ID				Sigma 50-500mm F4.5-6.3 DG OS HSM       AF-S Nikkor 24mm f/1.4G ED
DOF					inf (5.68 m - inf)                      2.51 m (3.09 - 5.60)
Focus Mode			AF-S                                    Manual
Focus Distance		125.89 m                                3.98 m
Compensation	    0                                       -1
Noise Reduction		Off                                     FPNR
Whitebalance	    Auto2                                   Sunny
Flash				No Flash                                No Flash
Flash Mode	        Did Not Fire                            Did Not Fire
```

其中最值得关注的参数有 [Shutter 快门速度](https://en.wikipedia.org/wiki/Shutter_speed)（曝光时间）、[Aperture 焦比](https://en.wikipedia.org/wiki/Aperture)（决定进光量）以及 [ISO Speed](https://en.wikipedia.org/wiki/Film_speed)（底片的光敏感性）。
可以看出两者的对比十分明显，数值可相差十倍有余。

如果读者拥有专业设备，不妨依照上述参数调整相机来感受二者的极端差距。
至于说希望使用手机来试验的读者，我对 `Aperture` 这个参数稍作提醒。
这一参数通常是用 [焦比 F-number](https://en.wikipedia.org/wiki/F-number) 表示的，比如我手机的参数就被写作 `f/1.9`；
而上面参数表明 nighttime 时的拍摄光圈直径大小是 daytime 拍摄时的近五倍。
焦比按照定义是焦长与镜头光圈直径之比，所以一般的手机是不可能修改这一硬件参数的，也就是说根本不能够达到 `f/14.0` 这一数值。
对于那些利用手机拍摄试验来反驳 ISS 视频没有看到星星的言论，我的反驳是：
控制变量是科学试验的核心，如果不能有效地控制影响曝光的相机参数，那么其实验结果自然也就不可信。

## 结语

如果大家对我的论证有不同意见，认为推理站不住脚，不妨在博客下方评论区留言，让所有人都可以看到你的想法。
如果想要深入探讨对星空拍照问题的质疑，欢迎加入我的 [Telegram 群组](https://t.me/space_truth)。
在整个收集资料的过程中，我学习了不少新的知识，更是数次领略到浩瀚星河的无穷魅力。
故而作此文，以“星汉灿烂”为题，纪念我对星空的倾心陶醉。
