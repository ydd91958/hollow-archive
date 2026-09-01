/**
 * 北岭生活论坛 · bbs.beiling.net
 *
 * 一个普通的地方社区站。九个帖子里只有一个真正相关，
 * 另外两个提供旁证。核心帖里的关键信息由一条被管理员删掉的回复承载，
 * 玩家要先在别处见过那个日期，论坛才会把「历史版本」按钮露出来。
 */

import type { SceneImage } from '@/shared/components/photo/SceneImage'

export interface Board {
  id: string
  name: string
  desc: string
  threadCount: number
  postCount: number
}

export interface Reply {
  floor: number
  author: string
  registered: string
  posts: number
  time: string
  text: string
  /** 用户资料栏里的个人主页。真实论坛都有这个字段。 */
  homepage?: { label: string; href: string }
  /** 帖子里贴的图。 */
  images?: SceneImage[]
  /** 被管理员删除的回复。 */
  deleted?: {
    reason: string
    time: string
    /** 只有拿到历史版本才能看到的原文。 */
    original: string
    /** 原文里附带的签名信息。 */
    signature?: string
  }
}

export interface Thread {
  id: string
  boardId: string
  title: string
  author: string
  registered: string
  posts: number
  time: string
  views: number
  pinned?: boolean
  body: string[]
  homepage?: { label: string; href: string }
  images?: SceneImage[]
  replies: Reply[]
}

export const BOARDS: Board[] = [
  { id: 'chat', name: '城事杂谈', desc: '北岭大事小事，随便聊聊', threadCount: 12847, postCount: 96214 },
  { id: 'flea', name: '二手闲置', desc: '闲置转让，同城自提', threadCount: 8032, postCount: 24118 },
  { id: 'job', name: '求职招聘', desc: '本地招聘与求职信息', threadCount: 3391, postCount: 15602 },
  { id: 'photo', name: '老照片', desc: '北岭的过去', threadCount: 742, postCount: 6183 },
  { id: 'recall', name: '旧事重提', desc: '记不清的事，来这儿对对', threadCount: 1156, postCount: 18904 },
]

export const THREADS: Thread[] = [
  /* ══════════ 旧事重提 · 贯穿物：火车站的钟 ══════════
     玩家在这里第一次遇到「一群人记得 A，记录写着 B」。
     没有术语，没有诡异感，就是本地人吵架。
     等他后来在空册的静置名录里看到同一条，才知道这叫什么。 */
  {
    id: 'STATION-CLOCK',
    boardId: 'recall',
    title: '北岭站那个钟到底是罗马数字还是阿拉伯数字',
    author: '半坡新村',
    registered: '2016-04',
    posts: 812,
    time: '2024-03-11 21:07',
    views: 4231,
    body: [
      '昨天跟我媳妇为这个争了一晚上。我记得小时候去接我姥，站前那个钟面上是罗马数字，就那种一竖两竖的。她说我记岔了，说从来都是阿拉伯的。',
      '我上网找了张现在的照片，确实是阿拉伯的。但是我真的记得是罗马的。',
      '有没有八零后能作证的。',
    ],
    images: [
      {
        kind: 'station',
        numerals: 'arabic',
        src: 'station-now-arabic.jpg',
        treatment: 'scan',
        caption: '现在的北岭站（网上找的）',
        width: 340,
      },
    ],
    replies: [
      {
        floor: 2,
        author: '开水房老李',
        registered: '2011-09',
        posts: 6241,
        time: '2024-03-11 21:44',
        text: '阿拉伯的。我在站上干了二十三年，天天从底下过。',
      },
      {
        floor: 3,
        author: '柏树街',
        registered: '2013-02',
        posts: 1877,
        time: '2024-03-11 22:19',
        text: '我也记得是罗马的？我小学春游在那儿排过队。不过我这人记性一直不行，可能是别的地方。',
      },
      {
        floor: 4,
        author: '开水房老李',
        registered: '2011-09',
        posts: 6241,
        time: '2024-03-11 22:31',
        text: '你们是不是想起石城站了。石城那个是罗马的。',
      },
      {
        floor: 5,
        author: '半坡新村',
        registered: '2016-04',
        posts: 812,
        time: '2024-03-11 22:50',
        text: '不可能，我姥家就在这儿，我没去过石城。',
      },
      {
        floor: 6,
        author: '窗台',
        registered: '2011-11',
        posts: 403,
        time: '2024-03-12 08:16',
        text: '九四年翻修的时候换过一次。换之前是罗马的，我拍过。回头我扫了传上来。',
        homepage: { label: '窗台上的胶卷', href: '/blog' },
      },
      {
        floor: 7,
        author: '开水房老李',
        registered: '2011-09',
        posts: 6241,
        time: '2024-03-12 09:02',
        text: '九四年那次我在的，只换了灯箱和候车室座椅，钟没动。',
      },
      {
        floor: 8,
        author: '半坡新村',
        registered: '2016-04',
        posts: 812,
        time: '2024-03-13 19:38',
        text: '把我爸相册全翻了一遍，找到一张八六年的，能看见钟。传上来了，你们自己看。',
        images: [
          {
            kind: 'broken',
            filename: 'IMG_19860000_beilingzhan.jpg',
            note: '该附件已失效（上传于 2024-03-13）',
          },
        ],
      },
      {
        floor: 9,
        author: '柏树街',
        registered: '2013-02',
        posts: 1877,
        time: '2024-03-13 20:11',
        text: '图挂了。',
      },
      {
        floor: 10,
        author: '半坡新村',
        registered: '2016-04',
        posts: 812,
        time: '2024-03-14 07:55',
        text: '我这边也看不了了。刚才明明还能看。算了，不争了。',
      },
    ],
  },

  {
    id: 'LIONS',
    boardId: 'recall',
    title: '老百货门口的石狮子是一只还是一对',
    author: '菜市口张',
    registered: '2014-07',
    posts: 2290,
    time: '2023-11-28 16:22',
    views: 2617,
    body: [
      '拆之前门口那个石狮子，我一直记得就一只，在左边。今天跟我姐说起来，她一口咬定是一对。',
      '谁还有印象。',
    ],
    replies: [
      {
        floor: 2,
        author: '开水房老李',
        registered: '2011-09',
        posts: 6241,
        time: '2023-11-28 17:03',
        text: '一对。右边那只九几年被车撞了拉走修，修完没拉回来。所以你们俩说的都对，看你们记的是哪年。',
      },
      {
        floor: 3,
        author: '菜市口张',
        registered: '2014-07',
        posts: 2290,
        time: '2023-11-28 17:40',
        text: '哦，那就说得通了。谢了老李。',
      },
      {
        floor: 4,
        author: '半坡新村',
        registered: '2016-04',
        posts: 812,
        time: '2023-11-29 09:14',
        text: '这个版真好，什么陈芝麻烂谷子都有人记得。',
      },
    ],
  },

  {
    id: 'NOODLE-GONE',
    boardId: 'recall',
    title: '找一家面馆，在兴平路上，招牌是绿的',
    author: '不吃香菜',
    registered: '2019-05',
    posts: 340,
    time: '2024-06-02 12:41',
    views: 1893,
    body: [
      '大概零几年的时候，兴平路靠近水文大厦那一段有家面馆，招牌绿底白字，卖刀削面。我上班那几年天天吃。',
      '前几天想带我对象去，找不着了。工商也查不到这个名字。那个门牌号查出来一直是个五金店，从九八年到现在都是。',
      '我不可能记错，我在那儿吃了三年。',
    ],
    replies: [
      {
        floor: 2,
        author: '柏树街',
        registered: '2013-02',
        posts: 1877,
        time: '2024-06-02 13:20',
        text: '你是不是记成隔壁县的了。那边也有一条兴平路。',
      },
      {
        floor: 3,
        author: '不吃香菜',
        registered: '2019-05',
        posts: 340,
        time: '2024-06-02 13:35',
        text: '不是。我们单位就在水文大厦，中午走过去五分钟。',
      },
      {
        floor: 4,
        author: '开水房老李',
        registered: '2011-09',
        posts: 6241,
        time: '2024-06-02 15:08',
        text: '绿招牌刀削面有点印象。是不是没挂执照那种，做了几年就撤了。',
      },
      {
        floor: 5,
        author: '不吃香菜',
        registered: '2019-05',
        posts: 340,
        time: '2024-06-02 16:44',
        text: '有执照的，墙上挂着，我天天看着。',
      },
    ],
  },

  {
    id: 'FIVE-PEOPLE',
    boardId: 'recall',
    title: '我家那张合影本来是五个人',
    author: '南关口',
    registered: '2017-10',
    posts: 528,
    time: '2025-01-19 22:30',
    views: 3054,
    body: [
      '我妈过世以后整理东西，翻出一张老照片，我们家院里拍的。我记得清清楚楚是五个人，我爸我妈我姐我，还有一个我表叔。',
      '现在照片上只有四个。位置也不对，我姐站在最边上，可我记得她在中间。',
      '我不是说照片被人动过。就是很奇怪。',
    ],
    replies: [
      {
        floor: 2,
        author: '菜市口张',
        registered: '2014-07',
        posts: 2290,
        time: '2025-01-19 23:12',
        text: '可能是两张照片记混了。同一天一般拍好几张。',
      },
      {
        floor: 3,
        author: '南关口',
        registered: '2017-10',
        posts: 528,
        time: '2025-01-20 07:19',
        text: '就这一张。背面有我妈写的日期。',
      },
      {
        floor: 4,
        author: '柏树街',
        registered: '2013-02',
        posts: 1877,
        time: '2025-01-20 09:41',
        text: '节哀。这种时候人容易钻牛角尖，别多想。',
      },
      {
        floor: 5,
        author: '南关口',
        registered: '2017-10',
        posts: 528,
        time: '2025-01-20 10:03',
        text: '谢谢。可能是吧。',
      },
    ],
  },

  {
    id: 'SCHOOL-NAME',
    boardId: 'recall',
    title: '兴平路小学以前是不是叫第一小学',
    author: '柏树街',
    registered: '2013-02',
    posts: 1877,
    time: '2022-09-08 20:15',
    views: 1420,
    body: ['同学群里为这个吵起来了。有人说一直就叫兴平路小学，有人说以前门口挂的是兴平路第一小学。'],
    replies: [
      {
        floor: 2,
        author: '开水房老李',
        registered: '2011-09',
        posts: 6241,
        time: '2022-09-08 21:02',
        text: '北岭就没有过第二小学，哪来的第一。',
      },
      {
        floor: 3,
        author: '菜市口张',
        registered: '2014-07',
        posts: 2290,
        time: '2022-09-09 08:33',
        text: '楼上这个理由挺有说服力的。',
      },
      {
        floor: 4,
        author: '半坡新村',
        registered: '2016-04',
        posts: 812,
        time: '2022-09-09 11:20',
        text: '但是我也记得有第一两个字。',
      },
    ],
  },

  {
    id: 'RULES',
    boardId: 'chat',
    title: '【公告】城事杂谈版规（2019 修订）',
    author: '版务组',
    registered: '2008-05-02',
    posts: 1204,
    time: '2019-04-01 10:00',
    views: 48211,
    pinned: true,
    body: [
      '一、禁止发布广告、招嫖、赌博及一切违法信息。',
      '二、禁止人身攻击、地域攻击与恶意灌水。',
      '三、禁止发布未经证实的消息，尤其涉及公共安全、事故与失踪人员的内容。如需求助请联系有关部门。',
      '四、转载请注明出处。',
      '违规内容由版务组直接删除，情节严重者封禁账号。',
    ],
    replies: [],
  },

  {
    id: 'YL-ACCESS',
    boardId: 'chat',
    title: '云岭那边现在还能进去吗？',
    author: '山雀',
    registered: '2021-03-17',
    posts: 86,
    time: '2023-09-14 21:07',
    views: 2891,
    body: [
      '想趁十一带家里人去云岭乡那边走走，看网上有人说山脚下有个废弃的水文观测站，还挺有意思的。',
      '有几个问题想问一下本地的朋友：路好走吗？开车能到吗？那地方现在还能进去看看吗？',
      '主要是想拍点照片，不进建筑物。',
    ],
    replies: [
      {
        floor: 2,
        author: '老陈修表',
        registered: '2009-11-08',
        posts: 5417,
        time: '2023-09-14 21:44',
        text: '能进，没人拦。从乡道往北拐进去还有五六里土路，下过雨底盘低的车别去。到了你会失望的，就一片水泥地，井口封死了，站房八几年就拆了，什么都没有。',
      },
      {
        floor: 3,
        author: '山雀',
        registered: '2021-03-17',
        posts: 86,
        time: '2023-09-14 21:52',
        text: '封井口是什么时候的事啊',
      },
      {
        floor: 4,
        author: '老陈修表',
        registered: '2009-11-08',
        posts: 5417,
        time: '2023-09-14 22:10',
        text: '八十年代末。我那会儿还小，跟着大人去看过施工，水泥车进不去，是用小推车一趟一趟推进去的，推了好几天。',
      },
      {
        floor: 5,
        author: '北岭一枝花',
        registered: '2015-06-22',
        posts: 1932,
        time: '2023-09-15 08:31',
        text: '那边手机信号不太行，你要去的话跟家里说一声。',
      },
      {
        floor: 6,
        author: '匿名用户',
        registered: '——',
        posts: 0,
        time: '2023-09-15 12:19',
        text: '我爸八几年在那边干过。他说有一天晚上全站的仪器都停了，{{echo:四十来分钟|四十分钟}}，后来又自己好了，谁都说不清怎么回事。第二天上面来人把记录本收走了，让他们别往外说。他退休以后才跟我讲的。',
      },
      {
        floor: 7,
        author: '山雀',
        registered: '2021-03-17',
        posts: 86,
        time: '2023-09-15 12:40',
        text: '这么邪乎？',
      },
      {
        floor: 8,
        author: '老陈修表',
        registered: '2009-11-08',
        posts: 5417,
        time: '2023-09-15 13:02',
        text: '八十年代的设备，停一停很正常。我那时候家里的电视一天要拍三回。',
      },
      {
        floor: 9,
        author: '窗台',
        registered: '2011-08-19',
        posts: 47,
        time: '2023-09-15 22:38',
        text: '（本层内容已删除）',
        deleted: {
          reason: '违反版规第三条：发布未经证实的信息',
          time: '2023-09-16 09:41',
          original:
            '不是四十分钟，是四十一。我当时就在那个班上，纸带我亲手换的，抬笔的位置我记得清清楚楚。第二天让我按四十填，我争了两句，就没再争。还有一件事我一直没想明白：井是八七年十一月封的，可八八年还有人在下面做记录，记录进了卷册。那份卷册的目录我在网上见过，附件编号是 YL-87-03-A17，我打不开。你们谁能打开，我请他吃饭。',
          signature: '该用户已于 2023-09-16 注销',
        },
      },
      {
        floor: 10,
        author: '老陈修表',
        registered: '2009-11-08',
        posts: 5417,
        time: '2023-09-16 10:15',
        text: '楼上的怎么删了。他说的那个我小时候也听大人讲过。',
      },
      {
        floor: 11,
        author: '北岭一枝花',
        registered: '2015-06-22',
        posts: 1932,
        time: '2023-09-16 11:02',
        text: '前年有人去那边拍照，说水泥地上有一小块颜色不一样，像是后来又补过一次。可能是后来做过维护吧。',
      },
      {
        floor: 12,
        author: '匿名用户',
        registered: '——',
        posts: 0,
        time: '2023-09-17 19:44',
        text: '维护什么，那口井早就废了。',
      },
      {
        floor: 13,
        author: '山雀',
        registered: '2021-03-17',
        posts: 86,
        time: '2023-09-18 09:20',
        text: '谢谢各位，看来也没什么可看的，我们改去南河那边了。',
      },
      {
        floor: 14,
        author: '版务组',
        registered: '2008-05-02',
        posts: 1204,
        time: '2023-09-18 15:33',
        text: '本帖已处理一条违规回复。请各位遵守版规，不要传播未经证实的说法。',
      },
    ],
  },

  {
    id: 'SEEK-1987',
    boardId: 'chat',
    title: '寻人：1987 年前后在云岭乡工作过的人',
    author: '柏树街',
    registered: '2016-02-11',
    posts: 213,
    time: '2022-06-08 14:52',
    views: 1074,
    body: [
      '受朋友之托问一下。他在整理他父亲留下的东西，里面有一批八十年代的工作笔记和几卷胶卷，落款是云岭乡，1987 到 1988 年。',
      '笔记里提到几个人名，只有姓和名，查不到人。想问问本地有没有人认识当年在那边搞水文勘察的。',
      '主要是想把东西还给人家，或者交给单位。',
    ],
    replies: [
      {
        floor: 2,
        author: '老陈修表',
        registered: '2009-11-08',
        posts: 5417,
        time: '2022-06-08 16:30',
        text: '那会儿在云岭干活的应该是市里的水文地质队，后来单位改制没了。行业协会有个工程资料库，老项目的著录都在上面，能查到人员名单。你可以去问问现在那个华北水测，听说老档案都在他们那儿。',
      },
      {
        floor: 3,
        author: '柏树街',
        registered: '2016-02-11',
        posts: 213,
        time: '2022-06-09 09:12',
        text: '谢谢，我让他去问问。',
      },
      {
        floor: 4,
        author: '窗台',
        registered: '2011-08-19',
        posts: 47,
        time: '2022-06-11 22:05',
        text: '胶卷别扔。那几年那边拍的东西不多。',
      },
    ],
  },

  {
    id: 'HBSC-WORK',
    boardId: 'job',
    title: '有人在华北水测上过班吗，想问问情况',
    author: '找工作的小李',
    registered: '2024-08-30',
    posts: 19,
    time: '2025-05-21 10:14',
    views: 863,
    body: [
      '看到他们招资料管理员，六千多，双休不加班，听着还行。',
      '就是这个岗位挂了好久了一直在招，是不是有什么问题？有懂的朋友说说吗。',
    ],
    replies: [
      {
        floor: 2,
        author: '北岭一枝花',
        registered: '2015-06-22',
        posts: 1932,
        time: '2025-05-21 11:40',
        text: '我同学在那儿干过测绘，公司本身没问题，正经单位，工资按时发。资料室那个岗好像一直招不满，说是活儿太闷。',
      },
      {
        floor: 3,
        author: '匿名用户',
        registered: '——',
        posts: 0,
        time: '2025-05-21 15:22',
        text: '负一层，没窗户，一天到晚扫描老卷宗。我面过，聊完就没去。倒不是吓人，就是没意思。',
      },
      {
        floor: 4,
        author: '老陈修表',
        registered: '2009-11-08',
        posts: 5417,
        time: '2025-05-22 08:03',
        text: '那家公司是老水文地质队改制来的，二〇〇六年重新注册的，老底子还在。档案确实多。',
      },
      {
        floor: 5,
        author: '找工作的小李',
        registered: '2024-08-30',
        posts: 19,
        time: '2025-05-22 09:30',
        text: '明白了，谢谢大家。我再看看。',
      },
    ],
  },

  {
    id: 'XINGPING-ROAD',
    boardId: 'chat',
    title: '兴平路到底什么时候能修完',
    author: '每天堵半小时',
    registered: '2020-09-03',
    posts: 604,
    time: '2025-06-02 08:11',
    views: 3921,
    body: ['围挡都围了十个月了，早高峰从城西过来要多堵二十分钟。有没有知道工期的。'],
    replies: [
      {
        floor: 2,
        author: '北岭一枝花',
        registered: '2015-06-22',
        posts: 1932,
        time: '2025-06-02 09:05',
        text: '说是年底，我看悬。',
      },
      {
        floor: 3,
        author: '老陈修表',
        registered: '2009-11-08',
        posts: 5417,
        time: '2025-06-02 10:22',
        text: '管廊工程，慢正常。上回修的时候也是拖了大半年。',
      },
    ],
  },

  {
    id: 'NOODLE',
    boardId: 'chat',
    title: '兴平路新开那家面馆试了下',
    author: '吃饱了睡',
    registered: '2019-07-14',
    posts: 1488,
    time: '2025-06-19 12:48',
    views: 1633,
    body: ['牛肉面十八块，量还行，汤偏咸。老板是外地口音。中午人不多，不用排队。'],
    replies: [
      {
        floor: 2,
        author: '每天堵半小时',
        registered: '2020-09-03',
        posts: 604,
        time: '2025-06-19 13:30',
        text: '围挡拆了再说吧，现在开车过去没地方停。',
      },
    ],
  },

  {
    id: 'WASHER',
    boardId: 'flea',
    title: '转让 九成新洗衣机 8 公斤 自提',
    author: '搬家甩卖',
    registered: '2023-12-05',
    posts: 41,
    time: '2025-06-25 19:22',
    views: 412,
    body: ['买了两年，因为搬家出，功能都正常，350 元自提。城西永安街附近，不包送。'],
    replies: [
      {
        floor: 2,
        author: '吃饱了睡',
        registered: '2019-07-14',
        posts: 1488,
        time: '2025-06-25 20:01',
        text: '还在吗',
      },
    ],
  },

  {
    id: 'MOVING',
    boardId: 'chat',
    title: '求推荐靠谱的搬家公司',
    author: '搬家甩卖',
    registered: '2023-12-05',
    posts: 41,
    time: '2025-06-26 09:15',
    views: 288,
    body: ['城西搬到城东，两室一厅，有一台钢琴。之前找的那家加价太厉害。'],
    replies: [
      {
        floor: 2,
        author: '北岭一枝花',
        registered: '2015-06-22',
        posts: 1932,
        time: '2025-06-26 10:40',
        text: '钢琴一定要提前说清楚，不然到现场肯定加钱。',
      },
    ],
  },

  {
    id: 'OLD-STATION',
    boardId: 'photo',
    title: '【老照片】九十年代的北岭火车站',
    author: '柏树街',
    registered: '2016-02-11',
    posts: 213,
    time: '2024-03-02 16:40',
    views: 5217,
    body: [
      '翻到几张九三、九四年拍的火车站站前广场，那会儿还是老站房，前面那排白杨树后来都砍了。',
      '[图片加载失败]',
      '[图片加载失败]',
    ],
    replies: [
      {
        floor: 2,
        author: '老陈修表',
        registered: '2009-11-08',
        posts: 5417,
        time: '2024-03-02 18:12',
        text: '有感觉。那个卖茶叶蛋的棚子我记得。',
      },
      {
        floor: 3,
        author: '窗台',
        registered: '2011-08-19',
        posts: 47,
        time: '2024-03-03 21:50',
        text: '楼主用的什么机器？我这儿也有一批那几年的负片，一直没扫。',
      },
    ],
  },
]

export const THREAD_BY_ID = new Map(THREADS.map((t) => [t.id, t]))
export const BOARD_BY_ID = new Map(BOARDS.map((b) => [b.id, b]))

export function getThread(id: string): Thread | undefined {
  return THREAD_BY_ID.get(id)
}

export function threadsOfBoard(boardId: string): Thread[] {
  return THREADS.filter((t) => t.boardId === boardId)
}
