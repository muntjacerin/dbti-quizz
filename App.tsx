import React, { useState, useEffect } from 'react';
import { ChevronRight, RefreshCw, Sparkles, AlertCircle, AlertTriangle, Brain } from 'lucide-react';

// --- DATA: 22 DBTI TYPES ---
const DBTI_TYPES = [
  {
    id: 'WHKT', enTitle: 'The Thermostat', zhTitle: '调温者',
    enDesc: "Thermoregulation goes completely out the window the second the round starts. You're either shivering to death or sweating bullets. Needs absolute control over the AC at all times.",
    zhDesc: "我恨空调：一打辩论就体温失调，发冷或发热，空调猛加",
    enAnalysis: "Your body's fight-or-flight response is utterly broken. Instead of processing adrenaline like a normal human, your brain just sends panic signals to your hypothalamus. You are a walking HVAC problem. Please bring a blanket to your next tournament.",
    zhAnalysis: "你的“战斗或逃跑”机制已经彻底罢工。作为对辩论压力的回应，你的大脑没有分泌肾上腺素，而是直接向你的下丘脑发送了恐慌信号。你就是一个行走的空调故障，建议下次打比赛自带电热毯。"
  },
  {
    id: 'WHWL', enTitle: 'The Rager', zhTitle: '发怒者',
    enDesc: "You tilt so fast. The moment the debate starts, you see red and instantly overheat. Basically dying of pure rage and anxiety on the spot.",
    zhDesc: "我红温了：一打就红，直接急死",
    enAnalysis: "You have zero emotional regulation when a timer is running. Your passion is admirable, but your blood pressure is terrifying. You treat every refutation as a personal attack on your bloodline.",
    zhAnalysis: "只要计时器一开始走，你的情绪管理能力就归零。你的热情固然令人钦佩，但你的血压实在令人担忧。你把对手的每一次反驳都视为对你祖宗十八代的侮辱。"
  },
  {
    id: 'DRAW-er', enTitle: 'The "Artist"', zhTitle: '画画达人',
    enDesc: "Literally could not care less about what the opponents or your own teammates are saying. Brain empty, only doodles.",
    zhDesc: "画画达人：对手/队友怎么讲都不想听，只能画画",
    enAnalysis: "You have achieved a level of dissociation that therapists study. While your partner is fighting for their life on the podium, you are perfecting the shading on a flow-sheet sketch of Spongebob. Respect.",
    zhAnalysis: "你的游离状态已经达到了心理学家需要专门研究的水平。当你的队友在台上为生存而战时，你却在flow纸上完美地勾勒海绵宝宝的阴影。瑞思拜。"
  },
  {
    id: 'IDOL', enTitle: 'The Fanboy/Fangirl', zhTitle: '追星者',
    enDesc: "Somehow miraculously paired with a debate god. You contribute absolutely nothing but pure awe, admiration, and begging them for their autograph.",
    zhDesc: "追星者：莫名其妙地，和高手分到一起，只知道欣赏+要签名",
    enAnalysis: "You are the ultimate NPC of the debate space, but you're having the time of your life. You are getting hard-carried and you have absolutely zero shame about it. Keep being the best cheerleader possible.",
    zhAnalysis: "你是辩论场上终极的NPC，但你玩得比谁都开心。你被大佬疯狂带飞，而且你对此毫无羞耻之心。继续做最好的拉拉队长吧！"
  },
  {
    id: 'MEAN', enTitle: 'The Hater', zhTitle: '骂人者',
    enDesc: "Actually a super nice person in real life, but demonic possession takes over during rounds. You curse the opponents, curse your teammates, curse the judge, curse yourself, and curse the universe. $!@*#!@##...^?",
    zhDesc: "骂人者：平时其实很 nice，一打辩论就突然想骂人，骂对手骂队友骂裁判 骂自己 骂世界 $!@*#!@##...^?",
    enAnalysis: "You harbor a deep, dark reservoir of toxicity that is only unlocked by the phrase 'the motion stands as'. You need an exorcism, or maybe just a nap.",
    zhAnalysis: "你的内心深处隐藏着一个巨大的恶意蓄水池，只有在听到“本场辩题是”时才会被解锁。你需要一场驱魔仪式，或者只是需要睡个好觉。"
  },
  {
    id: 'LAZY', enTitle: 'The Zen Sloth', zhTitle: '懒惰者',
    enDesc: "Too lazy to prep, too lazy to flow, too lazy to listen to speeches. You walk up to the podium perfectly chill, looking like you're on a middle school field trip. But honestly... isn't this just ultimate enlightenment?",
    zhDesc: "懒惰者：prep懒得prep，flow 懒得记，speech 懒得听，上台了也十分 chill，不知道的还以为是来春游的。但这又怎么不是一种极致的看淡一切呢？",
    enAnalysis: "Why stress when you can just vibe? You operate on 10% battery life at all times and still somehow manage to fill your speaking time. You have unlocked true Nirvana.",
    zhAnalysis: "既然可以摆烂，为什么要焦虑？你永远只带着10%的电量运作，却不知为何总能把发言时间填满。你已经达到了真正的涅槃境界。"
  },
  {
    id: 'SICK', enTitle: 'The Hypochondriac', zhTitle: '生病者',
    enDesc: "Physically ill the moment you have to debate. Miraculously cured the exact second you take 1st place.",
    zhDesc: "生病者：打辩论就难受，拿了1就好了",
    enAnalysis: "Your immune system is directly tied to your speaker scores. You suffer from chronic 'I don't want to do this'-itis, curable only by the sweet dopamine of a unanimous decision.",
    zhAnalysis: "你的免疫系统直接与你的个人得分挂钩。你患有慢性的“我不想打比赛”综合征，只有全票获胜的甜美多巴胺才能将其治愈。"
  },
  {
    id: 'YEAH', enTitle: 'The Toxic Optimist', zhTitle: '乐观者',
    enDesc: "Happy no matter what happens! Lose miserably? Still ecstatic! You treat away-tournaments strictly as paid vacations. Oh yeaaah~~~",
    zhDesc: "乐观者：怎么样都会快乐，输了也很开心，打外地赛就当旅游，Oh yeah ~~~",
    enAnalysis: "Your happiness is genuinely frightening to your competitive peers. You treat prestigious tournaments like an all-inclusive resort. Never change, you terrifying ray of sunshine.",
    zhAnalysis: "你的快乐让那些胜负欲极强的同龄人感到由衷的恐惧。你把高强度的比赛当成全包式度假村。永远别改变，你这个令人恐惧的小太阳。"
  },
  {
    id: 'OH-NO', enTitle: 'The Doomer', zhTitle: '忧伤者',
    enDesc: "\"We’re definitely losing.\" \"Our side of the motion is literally impossible.\"",
    zhDesc: "忧伤者：“我们绝对输了”“我们方打不了啊”",
    enAnalysis: "If pessimism was an Olympic sport, you would win gold. You concede the round in your head before prep time even ends. You are your own worst enemy.",
    zhAnalysis: "如果悲观是一项奥运项目，你绝对能拿金牌。在prep时间结束之前，你已经在脑海里认输了。你就是你自己最大的敌人。"
  },
  {
    id: 'AI-er', enTitle: 'The Cyborg', zhTitle: 'AI者',
    enDesc: "Non-stop ChatGPTing. You play with AI during prep, read AI-generated arguments mid-round, and make AI write your judge feedback.",
    zhDesc: "AI者：一直在用 AI ... (打前玩，打中用，打完写feedback)",
    enAnalysis: "Without a WiFi connection, you are effectively powerless. You have outsourced your critical thinking to a large language model. You are the reason older judges complain about 'this generation'.",
    zhAnalysis: "没有WiFi，你就是个战五渣。你已经把你的批判性思维外包给了一个大型语言模型。你就是那些老评委抱怨“这届年轻人不行”的根本原因。"
  },
  {
    id: 'WORK-er', enTitle: 'The Academic Victim', zhTitle: '苦命工作者',
    enDesc: "No matter what chaotic debate nonsense is happening around you, you're just sitting in the corner doing your AP Chem homework.",
    zhDesc: "(苦命)工作者：不管发生什么，一直在写作业",
    enAnalysis: "You are severely mismanaging your time and your life, yet you thrive in the chaos. Doing calculus while listening to a Prime Minister speech is a flex, but also a cry for help.",
    zhAnalysis: "你的时间管理和生活一塌糊涂，但你却在混乱中如鱼得水。一边听首相发言一边做微积分确实很装，但同时也是一种无声的求救。"
  },
  {
    id: 'SING-er', enTitle: 'The Main Character', zhTitle: '歌唱者',
    enDesc: "Uncomfortably obsessed with singing. If there are mysterious vocals echoing down the hallway outside the prep room, it is 100% you.",
    zhDesc: "歌唱者：特别喜欢唱歌，莫名其妙出现的歌声绝对是他/她唱的",
    enAnalysis: "You think life is a musical and the tournament venue is your stage. Everyone else is just stressed, and you're out here hitting high notes in the bathroom stall.",
    zhAnalysis: "你以为生活是一部音乐剧，而比赛场地就是你的舞台。当其他人都在焦虑时，你却在卫生间隔间里飙高音。"
  },
  {
    id: 'BREAK', enTitle: 'The Choker', zhTitle: '晋级者',
    enDesc: "You break at every single tournament... and then immediately lose your very first out-round. Every. Single. Time.",
    zhDesc: "晋级者：次次都晋级，一晋级第一个 out-round 就输",
    enAnalysis: "You are the definition of 'always the bridesmaid, never the bride.' You have the talent to make it to the elims, but your brain turns into pudding the second there's a trophy on the line.",
    zhAnalysis: "你是“永远的伴娘，从不是新娘”的完美写照。你有打进淘汰赛的实力，但只要一想到可能有奖杯，你的大脑就会立刻变成布丁。"
  },
  {
    id: 'MEME', enTitle: 'The Shitposter', zhTitle: '表情包者',
    enDesc: "You exist solely to screenshot people's ugly mid-speech faces, turn them into memes, and drop them in the group chat.",
    zhDesc: "表情包者：特别爱把人丑照变成 memes发到群里",
    enAnalysis: "You are a cyber-terrorist. You contribute more to team morale (and drama) than you do to actual case building. Keep your camera roll locked away.",
    zhAnalysis: "你是一个网络恐怖分子。你对团队士气（和抓马）的贡献远远超过了你对立论的贡献。请务必把你的手机相册锁好。"
  },
  {
    id: 'JBSR', enTitle: 'The Non-Human / Debate God', zhTitle: '神者',
    enDesc: "Actually not of this earth. 15 points across 5 rounds! Speaker award! A literal deity, and you do this effortlessly every single time.",
    zhDesc: "就不是人(神者)：真的不是人类！五个轮次一共15分！Speaker award!!! 真正的神！每次都如此！！！",
    enAnalysis: "You are incredibly intimidating and probably very lonely at the top. People don't debate you, they just survive you.",
    zhAnalysis: "你极其可怕，而且在高处不胜寒。人们从来不是在和你辩论，他们只是在你的碾压下苟延残喘。"
  },
  {
    id: 'FAKE', enTitle: 'The Sandbagger / Smurf', zhTitle: '伪装者',
    enDesc: "\"Omg guys I'm so bad at this, I haven't prepped at all 🥺\" — Proceeds to absolutely nuke the room and take the 1.",
    zhDesc: "假冒菜鸟(伪装者)：说自己很菜，其实很强",
    enAnalysis: "You are manipulative and thrive on lowering expectations so you can crush people's souls even harder. We see through your 'I'm so unprepared' act.",
    zhAnalysis: "你极具心机，喜欢通过降低别人的期望值来更狠地粉碎他们的灵魂。我们早就看穿了你“我什么都没准备”的虚伪表演。"
  },
  {
    id: 'CAFE', enTitle: 'The Caffeine Addict', zhTitle: '喝咖啡者',
    enDesc: "Unhinged coffee consumption. I LOVE COFFEE!!! COFFEE 4EVER!!! (Currently has a resting heart rate of 140 bpm).",
    zhDesc: "喝咖啡者：疯狂喝咖啡！我爱咖啡！！！咖啡 4ever！",
    enAnalysis: "Your blood is roughly 80% espresso. You speak at 300 words per minute not because you have good arguments, but because if you stop talking, your heart might explode.",
    zhAnalysis: "你的血液里大约有80%是浓缩咖啡。你语速达到每分钟300字，不是因为你的论点有多好，而是因为如果你停止说话，你的心脏可能就会爆炸。"
  },
  {
    id: 'SANE', enTitle: 'The Normal One', zhTitle: '理智者',
    enDesc: "The only sane person in the room. You do absolutely nothing abnormal, which honestly makes you the biggest weirdo here.",
    zhDesc: "理智者：最正常的人，完全不干任何不正常之事",
    enAnalysis: "In a room full of maniacs, being completely normal is highly suspicious. Are you a spy? Are you secretly judging everyone? (Yes).",
    zhAnalysis: "在一屋子疯子中，完全正常是一件非常可疑的事情。你是间谍吗？你是不是在暗中评判所有人？（别装了，肯定是）。"
  },
  {
    id: 'AHHH', enTitle: 'The Screamer', zhTitle: '尖叫者',
    enDesc: "Screams when you win. Screams when you lose. Screams when you break. Screams when you don't. Good motion? Scream. Bad motion? Scream. Happy? Scream. Sad? Scream. AHHHHHHHHH!!!",
    zhDesc: "尖叫者：赢了尖叫，输了也叫不break也叫，break也叫，好motion也叫，差motion也叫，开心也叫伤心也叫啊啊啊啊啊！！！",
    enAnalysis: "You lack an internal monologue. Every emotion you experience bypasses your brain and goes straight to your vocal cords. You are a public nuisance.",
    zhAnalysis: "你没有内心独白。你经历的每一种情绪都会绕过大脑，直接传达到声带。你就是一个行走的大喇叭。"
  },
  {
    id: 'IDIO-T', enTitle: 'The Idiot Savant', zhTitle: '傻者',
    enDesc: "Your case is completely unhinged. Your head feels totally empty with zero thoughts whatsoever, yet somehow you are incredibly lethal in the round.",
    zhDesc: "傻者：case 特别不正常，感觉自己脑子空空，但是又特别能打",
    enAnalysis: "You rely entirely on chaotic intuition. Your logic has so many holes that it creates a black hole, sucking the opponents into your void of confusion where you beat them with experience.",
    zhAnalysis: "你完全依靠混乱的直觉。你的逻辑漏洞百出，以至于形成了一个黑洞，把对手吸入你制造的困惑虚空中，然后你再用丰富的经验打败他们。"
  },
  {
    id: 'TALK-er', enTitle: 'The Yapper', zhTitle: '爱说话者',
    enDesc: "Talking. Always talking. BLA BLA BLA. You never, ever stop yapping.",
    zhDesc: "说话。一直在说话。BLA BLA BLA (爱说话者)",
    enAnalysis: "Silence makes you physically uncomfortable. You will fill any void with words, regardless of whether those words have meaning. Please, just breathe for a second.",
    zhAnalysis: "安静会让你感到生理上的不适。你会用言语填满任何空白，不管这些话有没有意义。求求你，稍微喘口气吧。"
  },
  {
    id: 'UHHH', enTitle: 'The Buffer', zhTitle: '结巴者',
    enDesc: "Cannot formulate a single coherent sentence during prep. Mid-speech, you just freeze and buffer like you're running on 900 ping dial-up internet.",
    zhDesc: "(结巴者) Prep 的时候说不出一句话，开始打的时候说到一半和网卡了一样...",
    enAnalysis: "Your brain is running Windows 95. Every time you try to access a complex argument, you get a blue screen of death. You need more RAM.",
    zhAnalysis: "你的大脑运行的还是Windows 95系统。每次你试图调用一个复杂的论点时，都会蓝屏死机。你需要加点内存条了。"
  }
];

// --- GENERATING 50 QUESTIONS MAPPING TO TYPES ---
const rawQuestions = [
  // 1-10: Prep Time Vibes
  { en: "Prep time starts! What's the very first thing you do?", zh: "备赛时间开始！你做的第一件事是什么？",
    options: [ { en: "Open ChatGPT.", zh: "打开ChatGPT。", map: ['AI-er'] }, { en: "Complain that we're going to lose.", zh: "抱怨我们肯定输了。", map: ['OH-NO'] }, { en: "Take out my homework.", zh: "拿出我的学校作业。", map: ['WORK-er'] }, { en: "Stare blankly at the wall. Brain is buffering.", zh: "两眼发直盯着墙。大脑开始缓冲。", map: ['UHHH'] } ] },
  { en: "Your partner is panicking about the motion. You:", zh: "你的队友对辩题感到恐慌。你：",
    options: [ { en: "Tell them to chill, we'll be fine. Whatever.", zh: "告诉他们冷静点，随便打打就行了。", map: ['LAZY', 'YEAH'] }, { en: "Yell at them for being useless.", zh: "大骂他们没用。", map: ['MEAN', 'WHWL'] }, { en: "Start drawing a little cat on your flow.", zh: "开始在你的flow纸上画小猫。", map: ['DRAW-er'] }, { en: "Scream in agreement.", zh: "跟着一起尖叫表示赞同。", map: ['AHHH'] } ] },
  { en: "How much of the case did you actually write during prep?", zh: "备赛期间你实际写了多少立论？",
    options: [ { en: "Every single word, perfectly formatted.", zh: "每一个字，格式完美。", map: ['SANE', 'JBSR'] }, { en: "I just have three confusing bullet points.", zh: "我只有三个不知所云的要点。", map: ['IDIO-T'] }, { en: "Nothing. I'll figure it out at the podium.", zh: "什么都没写。上台再说吧。", map: ['LAZY'] }, { en: "I just copy-pasted from Wikipedia/AI.", zh: "我只是从维基百科/AI那里复制粘贴了。", map: ['AI-er'] } ] },
  { en: "Prep room temperature is slightly cold.", zh: "备赛室的温度有点低。",
    options: [ { en: "Put on 3 jackets, start shivering uncontrollably.", zh: "穿上3件外套，开始控制不住地发抖。", map: ['WHKT'] }, { en: "Drink my 4th iced coffee anyway.", zh: "不管了，喝我的第4杯冰美式。", map: ['CAFE'] }, { en: "Complain loudly to anyone who will listen.", zh: "大声向任何愿意听的人抱怨。", map: ['TALK-er'] }, { en: "I literally didn't notice.", zh: "我根本没注意到。", map: ['JBSR', 'SANE'] } ] },
  { en: "You got paired with a debate god.", zh: "你和辩论大神分到了一组。",
    options: [ { en: "Ask for an autograph and do whatever they say.", zh: "要签名，并言听计从。", map: ['IDOL'] }, { en: "Pretend I'm bad so they do all the work, but I'm actually good.", zh: "装作自己很菜让他们干活，其实我很强。", map: ['FAKE'] }, { en: "Hum a happy tune, easy win!", zh: "哼起欢快的歌，稳赢！", map: ['SING-er', 'YEAH'] }, { en: "I *am* the debate god.", zh: "我*就是*辩论大神。", map: ['JBSR'] } ] },
  { en: "Five minutes left in prep!", zh: "备赛还剩五分钟！",
    options: [ { en: "Panic and scream.", zh: "恐慌并尖叫。", map: ['AHHH', 'WHWL'] }, { en: "Feel physically nauseous. Need a doctor.", zh: "感到生理性反胃。需要看医生。", map: ['SICK'] }, { en: "Keep talking non-stop about irrelevant stuff.", zh: "继续不停地聊无关紧要的事情。", map: ['TALK-er'] }, { en: "Finish my AP Calculus worksheet.", zh: "做完我的AP微积分卷子。", map: ['WORK-er'] } ] },
  { en: "The motion is incredibly weird and confusing.", zh: "辩题极其怪异且令人费解。",
    options: [ { en: "Perfect. My brain is also weird and confusing.", zh: "完美。我的大脑也一样怪异且令人费解。", map: ['IDIO-T'] }, { en: "Curse the tournament directors.", zh: "咒骂比赛组委会。", map: ['MEAN'] }, { en: "Cry a little.", zh: "偷偷哭一下。", map: ['OH-NO'] }, { en: "Take a selfie with my confused partner for the group chat.", zh: "和一脸懵逼的队友自拍发群里。", map: ['MEME'] } ] },
  { en: "Your partner asks you to explain your argument.", zh: "你的队友让你解释一下你的论点。",
    options: [ { en: "Uhhhh... well... so like...", zh: "呃……那个……就是……", map: ['UHHH'] }, { en: "I talk for 4 minutes straight without breathing.", zh: "我不喘气地连说4分钟。", map: ['TALK-er', 'CAFE'] }, { en: "Just show them a doodle I made.", zh: "给他们看我刚画的涂鸦。", map: ['DRAW-er'] }, { en: "Explain it perfectly, logically, calmly.", zh: "完美、有逻辑、冷静地解释清楚。", map: ['SANE'] } ] },
  { en: "Opponents are chatting loudly next to you during prep.", zh: "备赛时对手在旁边大声聊天。",
    options: [ { en: "Curse them out in my head (or out loud).", zh: "在心里（或大声）咒骂他们。", map: ['MEAN'] }, { en: "Take a picture of them looking dumb for a meme.", zh: "拍下他们看起来很蠢的照片做成表情包。", map: ['MEME'] }, { en: "Start sweating. The stress is real.", zh: "开始出汗。压力山大。", map: ['WHKT', 'SICK'] }, { en: "Start singing louder to assert dominance.", zh: "更大声地唱歌以确立统治地位。", map: ['SING-er'] } ] },
  { en: "Walking to the debate room...", zh: "走在去比赛房间的路上……",
    options: [ { en: "Screaming internally and externally.", zh: "由内而外地尖叫。", map: ['AHHH'] }, { en: "Telling everyone 'I'm gonna do so bad guys'.", zh: "告诉所有人‘家人们我这把绝对寄了’。", map: ['FAKE'] }, { en: "Vibing. It's just a debate.", zh: "无所谓。一场辩论而已。", map: ['LAZY', 'YEAH'] }, { en: "Chugging a Monster Energy.", zh: "狂炫一罐魔爪能量饮料。", map: ['CAFE'] } ] },
  
  // 11-20: Mid-Round / Speaking
  { en: "You stand up to speak. First sentence?", zh: "你站起来发言。你的第一句话是？",
    options: [ { en: "Judge, they are completely stupid.", zh: "评委，他们简直蠢透了。", map: ['MEAN', 'WHWL'] }, { en: "Umm... so... yeah.", zh: "呃……那个……是的。", map: ['UHHH'] }, { en: "Start speaking at Mach 5 speed.", zh: "以5马赫的语速开始输出。", map: ['CAFE'] }, { en: "Deliver a perfectly structured intro.", zh: "给出一个结构完美的开场白。", map: ['SANE', 'JBSR'] } ] },
  { en: "You forgot your next point mid-speech.", zh: "发言进行到一半，你忘了下一个论点。",
    options: [ { en: "Say absolute nonsense confidently. It somehow works.", zh: "自信地胡说八道。不知为何居然奏效了。", map: ['IDIO-T'] }, { en: "Look at my laptop for the AI-generated backup.", zh: "看电脑找AI生成的备用方案。", map: ['AI-er'] }, { en: "Freeze completely. Buffer mode.", zh: "完全僵住。进入缓冲模式。", map: ['UHHH'] }, { en: "Scream out of frustration.", zh: "因为沮丧而尖叫出声。", map: ['AHHH'] } ] },
  { en: "The opponent offers a POI (Point of Information).", zh: "对手提出质询 (POI)。",
    options: [ { en: "Wave them off aggressively.", zh: "充满攻击性地把他们挥退。", map: ['MEAN', 'WHWL'] }, { en: "Take it and destroy them with logic.", zh: "接受并用逻辑摧毁他们。", map: ['JBSR'] }, { en: "Ignore them, I'm too busy talking.", zh: "无视他们，我忙着说话呢。", map: ['TALK-er'] }, { en: "Accept it, immediately regret it, say 'we're losing'.", zh: "接受了，立刻后悔，然后说‘我们要输了’。", map: ['OH-NO'] } ] },
  { en: "You are being roasted in the opponent's speech.", zh: "对手在发言中对你疯狂开火。",
    options: [ { en: "Face turns bright red. Getting furious.", zh: "脸涨得通红。气得要命。", map: ['WHWL', 'WHKT'] }, { en: "Draw a very unflattering portrait of them.", zh: "画一幅他们极度难看的肖像画。", map: ['DRAW-er'] }, { en: "Take a blurry photo of them for the GC.", zh: "拍一张他们模糊的照片发群聊。", map: ['MEME'] }, { en: "Smile. I know I'm still better.", zh: "微笑。我知道我还是比他们强。", map: ['FAKE', 'YEAH'] } ] },
  { en: "Your partner is giving a terrible speech.", zh: "你的队友正在进行一场极其糟糕的发言。",
    options: [ { en: "Start doing my schoolwork. I can't watch.", zh: "开始做学校作业。我不忍直视了。", map: ['WORK-er'] }, { en: "Feel physically sick. My stomach hurts.", zh: "感到生理性恶心。我胃疼。", map: ['SICK'] }, { en: "Stare at them with pure hatred.", zh: "用纯粹的恨意死盯着他们。", map: ['MEAN'] }, { en: "Whatever, I'm still chilling.", zh: "随便吧，我依然很放松。", map: ['LAZY'] } ] },
  { en: "Time signal: 1 minute left.", zh: "时间提示：还剩1分钟。",
    options: [ { en: "Talk faster!! MORE COFFEE!!", zh: "说得更快！！需要更多咖啡！！", map: ['CAFE'] }, { en: "Wrap up smoothly and elegantly.", zh: "流畅优雅地收尾。", map: ['SANE', 'JBSR'] }, { en: "I ran out of things to say 3 minutes ago.", zh: "我三分钟前就没话说了。", map: ['LAZY', 'UHHH'] }, { en: "Start yapping about literally anything to fill time.", zh: "开始狂说任何东西来填满时间。", map: ['TALK-er', 'IDIO-T'] } ] },
  { en: "During the opponent's speech, you usually...", zh: "在对手发言时，你通常……",
    options: [ { en: "Flow meticulously.", zh: "一丝不苟地记flow。", map: ['SANE'] }, { en: "Write them angry notes on my paper.", zh: "在纸上给他们写愤怒的便签。", map: ['WHWL'] }, { en: "Admire their skill. Wow, they are so good.", zh: "欣赏他们的技巧。哇，他们好厉害。", map: ['IDOL'] }, { en: "Hum a song quietly.", zh: "小声哼歌。", map: ['SING-er'] } ] },
  { en: "You accidentally contradict your own partner.", zh: "你不小心反驳了你自己的队友。",
    options: [ { en: "Scream 'AHHH' internally.", zh: "在内心尖叫‘啊啊啊’。", map: ['AHHH'] }, { en: "Blame them. They were wrong anyway.", zh: "怪他们。反正本来就是他们错了。", map: ['MEAN'] }, { en: "Pretend it was a complex 4D chess move. It works.", zh: "假装这是个复杂的4D国际象棋策略。居然糊弄过去了。", map: ['IDIO-T'] }, { en: "Instantly give up hope. It's over.", zh: "瞬间放弃希望。全完了。", map: ['OH-NO'] } ] },
  { en: "Your flow sheet looks like...", zh: "你的flow纸看起来像……",
    options: [ { en: "An art museum exhibit.", zh: "一座美术馆的展览品。", map: ['DRAW-er'] }, { en: "A blank piece of paper.", zh: "一张白纸。", map: ['LAZY'] }, { en: "Chaotic scribbles of pure rage.", zh: "充满纯粹愤怒的狂乱涂鸦。", map: ['WHWL'] }, { en: "A perfectly organized spreadsheet.", zh: "一张完美组织的数据表。", map: ['JBSR'] } ] },
  { en: "The judge falls asleep.", zh: "评委睡着了。",
    options: [ { en: "Yell to wake them up.", zh: "大喊大叫把他们吵醒。", map: ['AHHH', 'TALK-er'] }, { en: "Turn them into a meme.", zh: "把他们做成表情包。", map: ['MEME'] }, { en: "Who cares, easy win.", zh: "谁在乎呢，轻松拿下。", map: ['YEAH'] }, { en: "Continue reading my AI script monolithically.", zh: "继续毫无感情地读我的AI稿子。", map: ['AI-er'] } ] },

  // 21-30: Post-Round / Results
  { en: "The debate finishes. First action?", zh: "比赛结束。第一个动作是？",
    options: [ { en: "Run to the bathroom, I feel sick.", zh: "跑到洗手间，我觉得恶心想吐。", map: ['SICK'] }, { en: "Start arguing with the opponents off-clock.", zh: "在台下继续和对手争吵。", map: ['MEAN', 'WHWL'] }, { en: "Ask the good debater for a selfie.", zh: "找打得好的辩手要自拍。", map: ['IDOL'] }, { en: "Open my homework again.", zh: "再次打开我的作业。", map: ['WORK-er'] } ] },
  { en: "Judge gives feedback. It's bad.", zh: "评委给点评了。点评很差。",
    options: [ { en: "I knew it. We are garbage.", zh: "我就知道。我们是垃圾。", map: ['OH-NO'] }, { en: "The judge is stupid, the opponents are stupid, the world is stupid.", zh: "评委是蠢货，对手是蠢货，世界是个蠢货。", map: ['MEAN'] }, { en: "Nod politely, take notes.", zh: "礼貌地点头，记笔记。", map: ['SANE'] }, { en: "Don't care, I'm just here to travel.", zh: "无所谓，我只是来旅游的。", map: ['YEAH', 'LAZY'] } ] },
  { en: "Judge gives feedback. It's good!", zh: "评委给点评了。点评很好！",
    options: [ { en: "Scream 'AHHHH WE WON!' in the hallway.", zh: "在走廊里尖叫‘啊啊啊我们赢了！’", map: ['AHHH'] }, { en: "Say 'wow I was so bad though' (I know I carried).", zh: "说‘哇我这把打得好烂’（心里清楚自己C麻了）。", map: ['FAKE'] }, { en: "My stomachache is magically cured.", zh: "我的胃痛奇迹般地痊愈了。", map: ['SICK'] }, { en: "Sing a victory song loudly.", zh: "大声唱起胜利之歌。", map: ['SING-er'] } ] },
  { en: "Writing judge feedback forms...", zh: "填写评委反馈表……",
    options: [ { en: "Ask ChatGPT to write a polite but firm review.", zh: "让ChatGPT写一篇礼貌但坚定的评价。", map: ['AI-er'] }, { en: "Too lazy, skip it.", zh: "太懒了，直接跳过。", map: ['LAZY'] }, { en: "Write a 5-page essay on why they were objectively wrong.", zh: "写一篇5页的论文，论证他们为什么客观上是错的。", map: ['JBSR', 'WHWL'] }, { en: "Just put random emojis.", zh: "随便发点表情包拉倒。", map: ['MEME', 'IDIO-T'] } ] },
  { en: "Waiting for the break announcement.", zh: "等待晋级名单公布。",
    options: [ { en: "Heart rate 180, chugging coffee.", zh: "心率180，狂喝咖啡。", map: ['CAFE'] }, { en: "We're not breaking. It's over.", zh: "我们晋级不了的。没戏了。", map: ['OH-NO'] }, { en: "Vibing, making memes about the delay.", zh: "很放松，正在做关于延迟公布名单的表情包。", map: ['MEME'] }, { en: "Doing my physics lab report.", zh: "在写我的物理实验报告。", map: ['WORK-er'] } ] },
  { en: "YOU BROKE! (Made it to elimination rounds)", zh: "你晋级了！（进入淘汰赛）",
    options: [ { en: "Time to lose the very first out-round as usual.", zh: "是时候像往常一样在第一轮淘汰赛输掉了。", map: ['BREAK'] }, { en: "AHHHHHHHHHHH!!!", zh: "啊啊啊啊啊啊啊！！！", map: ['AHHH'] }, { en: "Oh nice. Anyway...", zh: "哦不错。不管怎样……", map: ['LAZY', 'SANE'] }, { en: "Of course I did. I'm a god.", zh: "我当然晋级了。我是神。", map: ['JBSR'] } ] },
  { en: "First Elimination Round begins.", zh: "第一轮淘汰赛开始。",
    options: [ { en: "Instant brain freeze. I forgot how to debate.", zh: "大脑瞬间死机。我忘了怎么辩论了。", map: ['BREAK', 'UHHH'] }, { en: "Body temperature drops, shivering violently.", zh: "体温下降，剧烈颤抖。", map: ['WHKT'] }, { en: "Unleash my ultimate unhinged chaotic case.", zh: "释放我终极的、疯狂的混乱立论。", map: ['IDIO-T'] }, { en: "Rage mode activated. Destroy everyone.", zh: "狂暴模式开启。毁灭所有人。", map: ['WHWL', 'MEAN'] } ] },
  { en: "You lost the out-round.", zh: "你淘汰赛输了。",
    options: [ { en: "Expected. This always happens to me.", zh: "意料之中。我总是这样。", map: ['BREAK', 'OH-NO'] }, { en: "Oh well! Time to go sightseeing!", zh: "哎呀没事！去观光旅游咯！", map: ['YEAH'] }, { en: "Scream, cry, complain.", zh: "尖叫，哭泣，抱怨。", map: ['AHHH', 'WHWL'] }, { en: "Go back to doing my homework in peace.", zh: "回去平静地做我的作业。", map: ['WORK-er'] } ] },
  { en: "You check speaker tabs (individual scores).", zh: "你查看个人得分榜（Speaker Tabs）。",
    options: [ { en: "I'm rank 1. As usual.", zh: "我排第一。基操勿6。", map: ['JBSR'] }, { en: "I'm ranked low, but 'I didn't even try anyway'.", zh: "排名很低，但“反正我根本没认真打”。", map: ['FAKE'] }, { en: "Who cares, look at this funny picture I took.", zh: "谁在乎呢，看我拍的这张搞笑照片。", map: ['MEME', 'DRAW-er'] }, { en: "I got a 75? I'm gonna be sick.", zh: "我拿了75分？我要吐了。", map: ['SICK'] } ] },
  { en: "Tournament ends. Final thoughts?", zh: "比赛结束。最终感想？",
    options: [ { en: "I hate everyone.", zh: "我讨厌所有人。", map: ['MEAN'] }, { en: "That was fun! Let's get food!", zh: "太好玩了！我们去吃东西吧！", map: ['YEAH'] }, { en: "Finally, I can catch up on my sleep and homework.", zh: "终于可以补觉和补作业了。", map: ['WORK-er'] }, { en: "Talk about every single round for the next 3 hours.", zh: "在接下来的三个小时里不停地讨论每一轮比赛。", map: ['TALK-er'] } ] },
  
  // 31-40: Vibe Check
  { en: "What's your Discord/WeChat profile picture?", zh: "你的Discord/微信头像是？",
    options: [ { en: "An anime character or idol.", zh: "动漫角色或爱豆。", map: ['IDOL'] }, { en: "A deep-fried meme of my teammate.", zh: "我队友的高糊恶搞表情包。", map: ['MEME'] }, { en: "A cute drawing I made.", zh: "我自己画的可爱涂鸦。", map: ['DRAW-er'] }, { en: "Default or something completely normal.", zh: "默认头像或非常正常的东西。", map: ['SANE'] } ] },
  { en: "Your most used phrase in prep:", zh: "你在备赛时最常用的口头禅：",
    options: [ { en: "\"Chat, is this real?\" (talking to AI)", zh: "“家人们，这是真的吗？”（对着AI说话）", map: ['AI-er'] }, { en: "\"We are so cooked.\"", zh: "“我们要寄了。”", map: ['OH-NO'] }, { en: "\"Uhhhhh...\"", zh: "“呃呃呃……”", map: ['UHHH'] }, { en: "\"I literally don't care.\"", zh: "“我真的一点都不在乎。”", map: ['LAZY'] } ] },
  { en: "Your diet during a tournament:", zh: "比赛期间你的饮食：",
    options: [ { en: "Four iced lattes and zero water.", zh: "四杯冰拿铁，滴水不沾。", map: ['CAFE'] }, { en: "I'm too nauseous to eat anything.", zh: "我恶心得什么都吃不下。", map: ['SICK', 'WHKT'] }, { en: "I eat everything. Away-tournaments are for food!", zh: "什么都吃。去外地比赛就是为了吃！", map: ['YEAH'] }, { en: "Normal meals at normal times.", zh: "在正常时间吃正常的饭。", map: ['SANE'] } ] },
  { en: "How do you handle conflict?", zh: "你如何处理冲突？",
    options: [ { en: "Scream louder than the other person.", zh: "比对方叫得更大声。", map: ['AHHH', 'WHWL'] }, { en: "Curse them out in 5 different languages.", zh: "用5种不同的语言骂他们。", map: ['MEAN'] }, { en: "Confuse them with weird logic until they give up.", zh: "用奇怪的逻辑把他们绕晕直到他们放弃。", map: ['IDIO-T'] }, { en: "Ignore it and sing a song.", zh: "无视，并开始唱歌。", map: ['SING-er', 'DRAW-er'] } ] },
  { en: "If debate was an RPG game, your class would be:", zh: "如果辩论是一个RPG游戏，你的职业会是：",
    options: [ { en: "The Overpowered Boss.", zh: "属性超模的关底Boss。", map: ['JBSR'] }, { en: "The Bard (just singing/drawing/yapping in the back).", zh: "吟游诗人（只会在后面唱歌/画画/逼逼赖赖）。", map: ['SING-er', 'DRAW-er', 'TALK-er'] }, { en: "The Berserker (pure rage).", map: ['WHWL', 'MEAN'] }, { en: "The NPC who just watches.", map: ['LAZY', 'IDOL'] } ] },
  { en: "Your toxic trait?", zh: "你的有毒特质？",
    options: [ { en: "I pretend I didn't prep when I studied for 10 hours.", zh: "我学了10个小时却假装自己没准备。", map: ['FAKE'] }, { en: "I screenshot ugly faces during zoom debates.", zh: "我会在Zoom辩论时截别人的丑照。", map: ['MEME'] }, { en: "I use ChatGPT for literally everything.", zh: "我特么什么事都用ChatGPT。", map: ['AI-er'] }, { en: "I choke when it actually matters.", zh: "我在真正关键的时刻必掉链子。", map: ['BREAK'] } ] },
  { en: "Your best trait?", zh: "你最棒的特质？",
    options: [ { en: "I am literally a god at this.", zh: "我在这方面真的是个神。", map: ['JBSR'] }, { en: "I bring great vibes to the team.", zh: "我能给队伍带来超好的氛围。", map: ['YEAH', 'IDOL'] }, { en: "I am perfectly rational and normal.", zh: "我极其理性且正常。", map: ['SANE'] }, { en: "I do my schoolwork on time.", zh: "我能按时完成学校作业。", map: ['WORK-er'] } ] },
  { en: "Before speaking, you...", zh: "发言前，你……",
    options: [ { en: "Buffer for 10 seconds.", zh: "先缓冲10秒钟。", map: ['UHHH'] }, { en: "Feel a cold sweat down my spine.", zh: "感觉背脊发凉冒冷汗。", map: ['WHKT', 'SICK'] }, { en: "Take a massive gulp of coffee.", zh: "猛灌一大口咖啡。", map: ['CAFE'] }, { en: "Just start yapping immediately.", zh: "二话不说直接开始输出。", map: ['TALK-er'] } ] },
  { en: "What's in your bag?", zh: "你的包里有什么？",
    options: [ { en: "Textbooks, homework, 5 calculators.", zh: "课本，作业，5个计算器。", map: ['WORK-er'] }, { en: "Colored pens, sketchbooks.", zh: "彩色笔，速写本。", map: ['DRAW-er'] }, { en: "Energy drinks, anxiety meds.", zh: "能量饮料，抗焦虑药。", map: ['CAFE', 'WHWL'] }, { en: "Nothing. I forgot my bag.", zh: "什么都没有。我忘带包了。", map: ['LAZY', 'IDIO-T'] } ] },
  { en: "Your debate partner is crying. You:", zh: "你的队友哭了。你：",
    options: [ { en: "Cry with them. AHHHH!", zh: "陪他们一起哭。啊啊啊！", map: ['AHHH', 'OH-NO'] }, { en: "Insult the team that made them cry.", zh: "痛骂把他们惹哭的那个队伍。", map: ['MEAN'] }, { en: "Make a meme out of them crying.", zh: "把他们哭的样子做成表情包。", map: ['MEME'] }, { en: "Sing them a lullaby.", zh: "给他们唱首摇篮曲。", map: ['SING-er'] } ] },

  // 41-50: The Final Stretch
  { en: "Motion: This House would ban weekends. You:", zh: "辩题：本院将禁止周末。你：",
    options: [ { en: "Ask AI for arguments about capitalism.", zh: "让AI生成关于资本主义的论点。", map: ['AI-er'] }, { en: "Who cares, everyday is a weekend for me.", zh: "谁在乎呢，对我来说每天都是周末。", map: ['LAZY'] }, { en: "Actually, mathematically, this makes sense...", zh: "其实，从数学上讲，这是有道理的……", map: ['WORK-er', 'JBSR'] }, { en: "Come up with the most batshit insane case.", zh: "想出一个最疯狂、最离谱的立论。", map: ['IDIO-T'] } ] },
  { en: "The timer goes off (beep beep!).", zh: "计时器响了（哔哔！）。",
    options: [ { en: "Keep talking. I CANNOT STOP TALKING.", zh: "继续说。我特么停不下来。", map: ['TALK-er', 'CAFE'] }, { en: "Stop immediately and sit down like a normal person.", zh: "立刻停下，像个正常人一样坐好。", map: ['SANE'] }, { en: "Scream 'DONE!'", zh: "大喊一声‘讲完了！’", map: ['AHHH'] }, { en: "I finished 2 minutes ago anyway.", zh: "反正我两分钟前就讲完了。", map: ['LAZY'] } ] },
  { en: "Your team's strategy is:", zh: "你队伍的策略是：",
    options: [ { en: "Let the Debate God carry.", zh: "让辩论大神带飞。", map: ['IDOL'] }, { en: "Pure intimidation and rage.", zh: "纯粹的恐吓和狂怒。", map: ['WHWL', 'MEAN'] }, { en: "Confuse the judge until they vote for us.", zh: "把评委绕晕直到他们把票投给我们。", map: ['IDIO-T'] }, { en: "Hope we lose so we can go home.", zh: "希望我们输了就能早点回家。", map: ['OH-NO'] } ] },
  { en: "A random person asks how you did in the round.", zh: "一个路人问你这轮打得怎么样。",
    options: [ { en: "\"Terrible...\" (I got a 1).", zh: "“烂透了……”（其实拿了第一）。", map: ['FAKE'] }, { en: "\"GREAT! EVERYTHING IS AWESOME!\"", zh: "“超级好！一切都太棒了！”", map: ['YEAH'] }, { en: "\"I think I have a fever.\"", zh: "“我觉得我好像发烧了。”", map: ['WHKT', 'SICK'] }, { en: "\"Let me tell you about it for 30 minutes.\"", zh: "“让我花30分钟给你讲讲。”", map: ['TALK-er'] } ] },
  { en: "You accidentally drop your flow sheet.", zh: "你不小心把flow纸掉地上了。",
    options: [ { en: "It's just drawings of anime girls anyway.", zh: "无所谓，反正上面画的全是二次元美少女。", map: ['DRAW-er'] }, { en: "Stare at it. Buffer. Forget how to pick it up.", zh: "盯着它看。大脑缓冲。忘了怎么捡起来。", map: ['UHHH'] }, { en: "Swear loudly.", zh: "大声爆粗口。", map: ['MEAN'] }, { en: "Pick it up calmly.", zh: "平静地捡起来。", map: ['SANE'] } ] },
  { en: "Tournaments on Zoom are...", zh: "在Zoom上打比赛……",
    options: [ { en: "Perfect for hiding my AI tabs.", zh: "太完美了，正好可以隐藏我的AI标签页。", map: ['AI-er'] }, { en: "A great place to screenshot bad lighting.", zh: "一个截图糟糕打光的好地方。", map: ['MEME'] }, { en: "Terrible, I miss the away-trip vibes.", zh: "太糟了，我想念去外地比赛的氛围。", map: ['YEAH'] }, { en: "Great, I can play games on the side.", zh: "棒极了，我可以在旁边偷偷打游戏。", map: ['LAZY', 'WORK-er'] } ] },
  { en: "Your relationship with the AC remote:", zh: "你和空调遥控器的关系：",
    options: [ { en: "I am its master. I need it at 16°C or 30°C.", zh: "我是它的主人。我需要它在16度或30度之间切换。", map: ['WHKT'] }, { en: "I don't care.", zh: "不在乎。", map: ['SANE', 'LAZY'] }, { en: "I smash it when I'm angry.", zh: "生气的时候我会把它砸了。", map: ['WHWL'] }, { en: "I use it as a microphone to sing.", zh: "我把它当麦克风唱歌。", map: ['SING-er'] } ] },
  { en: "When someone says 'Debate is fun!' you say:", zh: "当有人说‘辩论很有趣！’时，你会说：",
    options: [ { en: "\"Yeah!! It's a great vacation!\"", zh: "“对啊！！这是一场超棒的度假！”", map: ['YEAH'] }, { en: "\"It makes me physically ill.\"", zh: "“它让我生理性恶心。”", map: ['SICK'] }, { en: "\"I hate it, I hate you, I hate myself.\"", zh: "“我恨它，我恨你，我恨我自己。”", map: ['MEAN'] }, { en: "You don't reply, you just stare at them like a god looking at a peasant.", zh: "你不回答，只是像神看乡巴佬一样盯着他们。", map: ['JBSR'] } ] },
  { en: "The one thing you actually prep:", zh: "你唯一真正去准备的东西：",
    options: [ { en: "My outfit. Got to look chill.", zh: "我的穿搭。必须要看起来很chill。", map: ['LAZY'] }, { en: "My vocal cords for screaming.", zh: "我用来尖叫的声带。", map: ['AHHH'] }, { en: "Coffee machine maintenance.", zh: "咖啡机的维护。", map: ['CAFE'] }, { en: "Excuses for why I'll lose the out-round.", zh: "我为什么会在淘汰赛输掉的借口。", map: ['BREAK'] } ] },
  { en: "Final question: Who are you really?", zh: "最后一个问题：你到底是个什么样的人？",
    options: [ { en: "I'm just a normal kid doing homework.", zh: "我只是一个写作业的普通孩子。", map: ['WORK-er', 'SANE'] }, { en: "A chaotic entity of pure nonsense.", zh: "一个充满纯粹废话的混沌实体。", map: ['IDIO-T', 'UHHH', 'TALK-er'] }, { en: "A god among men.", zh: "人中之神。", map: ['JBSR', 'FAKE'] }, { en: "I don't know, I'm just here for the vibes.", zh: "不知道，我只是来感受氛围的。", map: ['LAZY', 'YEAH', 'IDOL'] } ] }
];

const additionalQuestions = [
  { en: "Favorite debate format?", zh: "最喜欢的辩论赛制？", options: [ { en: "BP, so I can blame my partner.", zh: "BP（英国议会制），这样我就可以怪队友了。", map: ['MEAN'] }, { en: "Whatever format lets me use AI.", zh: "任何允许我用AI的赛制。", map: ['AI-er'] }, { en: "None. Debate is pain.", zh: "都不喜欢。辩论就是痛苦。", map: ['OH-NO', 'SICK'] }, { en: "The one where I win.", zh: "能让我赢的那个。", map: ['JBSR'] } ] },
  { en: "How do you dress for rounds?", zh: "比赛时你怎么穿？", options: [ { en: "Full suit. I am professional.", zh: "全套西装。我很专业。", map: ['SANE'] }, { en: "Sweatpants. I don't care.", zh: "运动裤。我不在乎。", map: ['LAZY'] }, { en: "Three sweaters because the AC is evil.", zh: "三件毛衣，因为空调太邪恶了。", map: ['WHKT'] }, { en: "Merch of my favorite anime/band.", zh: "我最爱的动漫/乐队周边。", map: ['IDOL'] } ] },
  { en: "You have 15 minutes of prep. You spend 10 minutes...", zh: "你有15分钟的备赛时间。你花了10分钟……", options: [ { en: "Screaming.", zh: "尖叫。", map: ['AHHH'] }, { en: "Drinking coffee.", zh: "喝咖啡。", map: ['CAFE'] }, { en: "Drawing on the whiteboard.", zh: "在白板上画画。", map: ['DRAW-er'] }, { en: "Doing AP Bio.", zh: "做AP生物。", map: ['WORK-er'] } ] },
  { en: "When the motion is announced, you...", zh: "宣布辩题时，你……", options: [ { en: "Sigh loudly.", zh: "大声叹气。", map: ['OH-NO'] }, { en: "Start talking immediately.", zh: "立刻开始讲话。", map: ['TALK-er'] }, { en: "Say 'I'm so bad at this topic' (I have a 50-page brief on it).", zh: "说‘我太不擅长这个话题了’（其实我有一份50页的资料）。", map: ['FAKE'] }, { en: "Take a picture of the slide.", zh: "拍下幻灯片。", map: ['MEME'] } ] },
  { en: "Your partner makes a brilliant point.", zh: "你的队友提出了一个绝妙的论点。", options: [ { en: "I didn't hear it, I was singing.", zh: "我没听见，我正在唱歌。", map: ['SING-er'] }, { en: "Nod sagely, pretending I thought of it.", zh: "故作深沉地点头，假装是我想出来的。", map: ['FAKE'] }, { en: "Write it down meticulously.", zh: "一丝不苟地记下来。", map: ['SANE'] }, { en: "Stare blankly.", zh: "两眼发直。", map: ['UHHH'] } ] },
  { en: "A team runs a weird definition.", zh: "有队伍抛出了一个奇怪的定义。", options: [ { en: "Counter with an even weirder definition.", zh: "用一个更奇怪的定义反击。", map: ['IDIO-T'] }, { en: "Get furiously angry. This is illegal!", zh: "愤怒至极。这是违法的！", map: ['WHWL'] }, { en: "Ask ChatGPT if it's allowed.", zh: "问ChatGPT这是否被允许。", map: ['AI-er'] }, { en: "Just vibe with it.", zh: "随便他们吧，顺着打。", map: ['YEAH'] } ] },
  { en: "You're assigned to judge a novice round.", zh: "你被分配去评判新手场的比赛。", options: [ { en: "I will be brutal.", zh: "我会非常残忍。", map: ['MEAN'] }, { en: "I will be asleep.", zh: "我会睡着。", map: ['LAZY'] }, { en: "I will write an essay of feedback.", zh: "我会写一篇长篇大论的反馈。", map: ['JBSR'] }, { en: "I'll do my own homework while they talk.", zh: "他们讲话的时候我做自己的作业。", map: ['WORK-er'] } ] },
  { en: "Your flow pen runs out of ink.", zh: "你的笔没墨水了。", options: [ { en: "Panic. Screaming crying throwing up.", zh: "恐慌。尖叫，哭泣，呕吐。", map: ['AHHH', 'SICK'] }, { en: "I didn't need it anyway, my brain is empty.", zh: "反正我也不需要，我脑子空空。", map: ['UHHH'] }, { en: "Borrow one politely.", zh: "礼貌地借一支。", map: ['SANE'] }, { en: "I was only using it to doodle anyway.", zh: "反正我只是拿来涂鸦的。", map: ['DRAW-er'] } ] },
  { en: "You hear rumors about a strong opponent.", zh: "你听到了关于一个强大对手的传闻。", options: [ { en: "I want their autograph.", zh: "我想要他们的签名。", map: ['IDOL'] }, { en: "I'm going to destroy them.", zh: "我要摧毁他们。", map: ['WHWL'] }, { en: "We are dead. It's over.", zh: "我们死定了。全完了。", map: ['OH-NO'] }, { en: "They are nothing compared to me.", zh: "跟我比他们算什么。", map: ['JBSR'] } ] },
  { en: "Tournament delays.", zh: "比赛延误了。", options: [ { en: "Perfect, more time for memes.", zh: "太完美了，有更多时间做表情包了。", map: ['MEME'] }, { en: "More time for coffee.", zh: "有更多时间喝咖啡了。", map: ['CAFE'] }, { en: "I will complain to everyone.", zh: "我要向所有人抱怨。", map: ['TALK-er'] }, { en: "I'll just sleep on the floor.", zh: "我直接睡在地板上。", map: ['LAZY'] } ] },
  { en: "What's your strategy for the 1st speaker?", zh: "你对第一发言人的策略是？", options: [ { en: "Read the AI script verbatim.", zh: "逐字朗读AI生成的稿子。", map: ['AI-er'] }, { en: "Stutter through it.", zh: "结结巴巴地念完。", map: ['UHHH'] }, { en: "Speak at 400 WPM.", zh: "以每分钟400字的语速输出。", map: ['CAFE'] }, { en: "Deliver it flawlessly.", zh: "完美无瑕地呈现。", map: ['JBSR'] } ] },
  { en: "What's your strategy for the last speaker?", zh: "你对最后发言人的策略是？", options: [ { en: "Yell loudly to seem confident.", zh: "大声喊叫以显得自信。", map: ['AHHH'] }, { en: "Roast everyone.", zh: "把所有人都喷一遍。", map: ['MEAN'] }, { en: "Use chaotic vibes to win hearts.", zh: "用混乱的氛围赢得人心。", map: ['IDIO-T'] }, { en: "Summarize calmly.", zh: "冷静地总结。", map: ['SANE'] } ] },
  { en: "You find out you are against your friends.", zh: "你发现你要对抗你的朋友。", options: [ { en: "Take unflattering pictures of them during their speech.", zh: "在他们发言时拍他们的丑照。", map: ['MEME'] }, { en: "Tell them 'pls be nice I suck' (I will destroy them).", zh: "对他们说‘求放过我很菜’（其实我会把他们打爆）。", map: ['FAKE'] }, { en: "Yay! Friendly match!", zh: "好耶！友谊赛！", map: ['YEAH'] }, { en: "I have no friends on the battlefield.", zh: "战场上没有朋友。", map: ['WHWL'] } ] },
  { en: "Your computer dies mid-round.", zh: "比赛中途你的电脑没电了。", options: [ { en: "Die instantly of stress.", zh: "因压力过大当场去世。", map: ['WHKT', 'SICK'] }, { en: "I rely entirely on AI so I'm useless now.", zh: "我完全依赖AI，所以我现在是个废人了。", map: ['AI-er'] }, { en: "I memorized my 15-point case anyway.", zh: "反正我已经把我的15点立论背下来了。", map: ['JBSR'] }, { en: "Just freestyle some nonsense.", zh: "直接即兴发挥说点废话。", map: ['IDIO-T'] } ] },
  { en: "The room is too hot.", zh: "房间太热了。", options: [ { en: "Complain loudly and non-stop.", zh: "大声且不停地抱怨。", map: ['TALK-er'] }, { en: "My body temperature drops to compensate. I am shivering.", zh: "我的体温下降以作补偿。我在发抖。", map: ['WHKT'] }, { en: "I don't notice, I'm doing math.", zh: "我没注意，我在做数学题。", map: ['WORK-er'] }, { en: "I will curse the sun itself.", zh: "我会连太阳一起咒骂。", map: ['MEAN'] } ] },
  { en: "You win a trophy.", zh: "你赢得了一个奖杯。", options: [ { en: "Take a selfie kissing it.", zh: "拍一张亲吻它的自拍。", map: ['IDOL'] }, { en: "Finally, now I can sleep.", zh: "终于，现在我可以睡觉了。", map: ['LAZY'] }, { en: "Sing the champions anthem.", zh: "唱起冠军赞歌。", map: ['SING-er'] }, { en: "Scream until my lungs give out.", zh: "尖叫直到肺部炸裂。", map: ['AHHH'] } ] },
  { en: "You didn't break.", zh: "你没有晋级。", options: [ { en: "I knew it.", zh: "我就知道。", map: ['OH-NO'] }, { en: "At least I didn't lose in the first out-round.", zh: "至少我没有在第一轮淘汰赛输掉。", map: ['BREAK'] }, { en: "More time for sightseeing!", zh: "有更多观光时间啦！", map: ['YEAH'] }, { en: "I will fight the tab director.", zh: "我要去打组委会算分的人。", map: ['WHWL'] } ] },
  { en: "How much coffee is too much?", zh: "喝多少咖啡算太多？", options: [ { en: "The limit does not exist.", zh: "没有极限。", map: ['CAFE'] }, { en: "One sip makes me jittery and sick.", zh: "喝一口就会让我发抖反胃。", map: ['SICK'] }, { en: "I prefer water like a normal person.", zh: "我喜欢像正常人一样喝水。", map: ['SANE'] }, { en: "I get my energy from chaos.", zh: "我从混乱中获取能量。", map: ['IDIO-T'] } ] },
  { en: "Someone asks for your flow.", zh: "有人找你要flow纸。", options: [ { en: "Here, it's a masterpiece of art.", zh: "给，这是一幅艺术杰作。", map: ['DRAW-er'] }, { en: "It's just memes.", zh: "上面只有梗图。", map: ['MEME'] }, { en: "It's entirely generated by AI.", zh: "这完全是AI生成的。", map: ['AI-er'] }, { en: "It's my calculus homework.", zh: "这是我的微积分作业。", map: ['WORK-er'] } ] },
  { en: "The ultimate debate philosophy:", zh: "终极的辩论哲学：", options: [ { en: "Win at all costs.", zh: "不惜一切代价赢。", map: ['JBSR', 'MEAN'] }, { en: "Just have fun and chill.", zh: "享受乐趣，放松点。", map: ['LAZY', 'YEAH'] }, { en: "Survive the panic.", zh: "在恐慌中活下来。", map: ['WHKT', 'UHHH'] }, { en: "Make noise.", zh: "制造噪音。", map: ['TALK-er', 'AHHH'] } ] }
];

const QUESTIONS = [...rawQuestions, ...additionalQuestions];

export default function App() {
  const [appState, setAppState] = useState('lang_selection'); // 'lang_selection', 'disclaimer', 'quiz', 'results'
  const [lang, setLang] = useState('en'); 
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({});
  const [resultData, setResultData] = useState(null);

  // Initialize scores
  useEffect(() => {
    const initialScores = {};
    DBTI_TYPES.forEach(t => initialScores[t.id] = 0);
    setScores(initialScores);
  }, []);

  const handleLanguageSelect = (selectedLang) => {
    setLang(selectedLang);
    setAppState('disclaimer');
  };

  const startQuiz = () => {
    setAppState('quiz');
  };

  const handleAnswer = (mappedTypes) => {
    const newScores = { ...scores };
    mappedTypes.forEach(type => {
      if (newScores[type] !== undefined) {
        newScores[type] += 1;
      }
    });
    setScores(newScores);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores) => {
    // Sort types by score
    const sorted = Object.entries(finalScores).sort((a, b) => b[1] - a[1]);
    const maxScore = sorted[0][1];
    
    // Ensure we don't divide by zero
    const base = maxScore > 0 ? maxScore : 1; 

    // Primary Type
    const primaryId = sorted[0][0];
    const primaryType = DBTI_TYPES.find(t => t.id === primaryId);

    // Shifts (Next 3 likely types with percentages relative to max score)
    const shifts = sorted.slice(1, 4).map(item => {
      const typeInfo = DBTI_TYPES.find(t => t.id === item[0]);
      let percentage = Math.round((item[1] / base) * 100);
      if (percentage > 99) percentage = 95; // Fake cap for realism
      if (percentage === 0) percentage = Math.floor(Math.random() * 10) + 1;
      return {
        ...typeInfo,
        percentage
      };
    });

    setResultData({
      primary: primaryType,
      shifts: shifts
    });
    setAppState('results');
  };

  const resetQuiz = () => {
    setAppState('lang_selection');
    setCurrentQ(0);
    setResultData(null);
    const initialScores = {};
    DBTI_TYPES.forEach(t => initialScores[t.id] = 0);
    setScores(initialScores);
  };

  // ---------------- RENDERS ----------------

  if (appState === 'lang_selection') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-2xl w-full bg-zinc-900 rounded-3xl border border-zinc-800 p-6 md:p-10 shadow-2xl text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-black mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            DBTI
          </h1>
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-zinc-300">
            The Debate Personality Test
            <br/>
            <span className="text-base font-normal text-zinc-500 mt-1 block">辩论人格“品鉴”</span>
          </h2>
          <p className="text-zinc-400 mb-8 text-sm md:text-base max-w-lg">
            50 highly accurate, slightly unhinged questions to diagnose your true debate persona. <br/><br/>
            50道极其精准、略带疯狂的题目，诊断你真实的辩论人格。
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
            <button 
              onClick={() => handleLanguageSelect('en')}
              className="flex-1 py-4 rounded-xl font-bold text-lg bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700 hover:border-purple-500 hover:text-purple-400"
            >
              English (Let's Go!)
            </button>
            <button 
              onClick={() => handleLanguageSelect('zh')}
              className="flex-1 py-4 rounded-xl font-bold text-lg bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700 hover:border-pink-500 hover:text-pink-400"
            >
              中文 (开始测试！)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (appState === 'disclaimer') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-xl w-full bg-zinc-900 rounded-3xl border border-red-900/50 p-8 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-6 opacity-10 text-red-500">
            <AlertTriangle size={150} />
          </div>

          <div className="flex items-center gap-3 mb-6 relative z-10 text-red-500">
            <AlertTriangle size={32} />
            <h2 className="text-2xl font-black uppercase tracking-wider">
              {lang === 'en' ? 'Warning & Disclaimer' : '警告与免责声明'}
            </h2>
          </div>

          <div className="space-y-4 text-zinc-300 relative z-10 text-sm md:text-base leading-relaxed">
            {lang === 'en' ? (
              <>
                <p>
                  Whether you're a 10-year debate veteran or someone who just likes arguing on the internet, you can take this.
                </p>
                <p>
                  If you get a result that attacks your soul, your options are: <strong>cry about it, complain to the void, or just retake the quiz</strong> and meticulously game the system until you get the "cool" type. Just don't blame me—I am merely the chaotic architect of this nonsense.
                </p>
                <p className="text-pink-400 font-bold">
                  Also, your result is NOT a legally binding excuse to break up with your debate partner, nor is it an excuse for why you didn't break at your last tournament.
                </p>
                <p>
                  The true purpose of this quiz is public humiliation: please share your results on your Moments/Stories so society can judge you (and to give me clout, lol). 
                </p>
                <p className="italic text-zinc-400">
                  Finally, this is a 100% non-profit, NGO-level operation. However, "donations" in the form of snacks, unhinged memes, and iced coffee are highly encouraged.
                </p>
              </>
            ) : (
              <>
                <p>
                  无论你是身经百战的辩论老手，还是纯粹喜欢在线抬杠的乐子人，都可以来测。
                </p>
                <p>
                  如果你对结果非常破防，你的选择有：<strong>大哭一场、疯狂抱怨、或者干脆重测一遍</strong>并精心计算选项，直到刷出你想要的“完美”人设。但请千万别怪我——我只是这个缺德测试的幕后黑手。
                </p>
                <p className="text-pink-400 font-bold">
                  另外，本测试结果【绝对不能】作为你跟辩论搭档分手的合法理由，也【不能】作为你上次比赛没 break 的借口。
                </p>
                <p>
                  本测试的唯一真实目的是“社会性死亡”：请把结果发到朋友圈让大家尽情嘲笑你（顺便帮我涨涨热度，哈哈）。
                </p>
                <p className="italic text-zinc-400">
                  最后，本测试是一个100%非营利的“NGO”项目。但是，非常欢迎大家用零食、缺德表情包和冰美式对我进行“捐赠”！
                </p>
              </>
            )}
          </div>

          <div className="mt-8 relative z-10">
            <button 
              onClick={startQuiz}
              className="w-full py-4 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white transition-colors shadow-lg shadow-red-900/50"
            >
              {lang === 'en' ? "I Understand, Let's Suffer" : "我明白了，让我受大罪吧"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (appState === 'results' && resultData) {
    const p = resultData.primary;
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans flex flex-col items-center">
        <div className="max-w-2xl w-full">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-zinc-500 font-bold tracking-widest uppercase text-sm mb-2">
              {lang === 'en' ? 'Your Official DBTI Diagnosis' : '你的官方DBTI诊断结果'}
            </h2>
            <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4 drop-shadow-lg">
              {p.id}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {lang === 'en' ? p.enTitle : p.zhTitle}
            </h1>
          </div>

          {/* Main Card */}
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 md:p-8 shadow-2xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={120} />
            </div>
            
            <div className="flex items-start gap-4 mb-6 relative z-10">
              <div className="p-3 bg-zinc-800 rounded-xl text-pink-400">
                <AlertCircle size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 text-zinc-200">
                  {lang === 'en' ? 'Core Description' : '核心描述'}
                </h3>
                <p className="text-zinc-400 leading-relaxed italic">
                  "{lang === 'en' ? p.enDesc : p.zhDesc}"
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-zinc-800 my-6"></div>

            <div className="flex items-start gap-4 relative z-10">
              <div className="p-3 bg-zinc-800 rounded-xl text-purple-400">
                <Brain size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-zinc-200">
                  {lang === 'en' ? 'Detailed Analysis (Roast)' : '详细分析（无情吐槽）'}
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {lang === 'en' ? p.enAnalysis : p.zhAnalysis}
                </p>
              </div>
            </div>
          </div>

          {/* Shifts */}
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 md:p-8 shadow-2xl mb-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <RefreshCw size={20} className="text-zinc-500" />
              {lang === 'en' ? 'Type Shift Potential' : '人格切换潜能'}
            </h3>
            <p className="text-sm text-zinc-500 mb-6">
              {lang === 'en' ? 'Other chaotic personas you might morph into during a breakdown:' : '在崩溃时，你可能突变的其他人格：'}
            </p>
            
            <div className="space-y-5">
              {resultData.shifts.map((shift, idx) => (
                <div key={idx} className="relative">
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span className="text-zinc-300">{shift.id} - {lang === 'en' ? shift.enTitle : shift.zhTitle}</span>
                    <span className="text-pink-400">{shift.percentage}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${shift.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={resetQuiz}
            className="w-full py-4 rounded-xl font-bold text-lg bg-zinc-100 text-zinc-900 hover:bg-white transition-colors shadow-lg mb-12"
          >
            {lang === 'en' ? 'Retake Test' : '重新测试'}
          </button>

          {/* Image Reference Section at the Bottom */}
          <div className="pt-8 border-t border-zinc-800 text-center">
            <h3 className="text-xl font-bold mb-4 text-zinc-400">
              {lang === 'en' ? 'The Complete DBTI Roster' : '完整的DBTI人格图鉴'}
            </h3>
            <div className="bg-zinc-900 p-2 rounded-3xl border-2 border-zinc-800 shadow-2xl inline-block w-full overflow-hidden">
              <img 
                src="image.png" 
                alt="Full DBTI Types Chart" 
                className="w-full h-auto object-contain rounded-2xl bg-white"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<div class="p-8 text-zinc-500 text-sm border border-dashed border-zinc-700 rounded-xl">[Chart image will appear here when you host 'image.png' in your project folder]</div>`;
                }}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Active Quiz State
  const q = QUESTIONS[currentQ];
  const progress = ((currentQ + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6 text-zinc-500 font-bold text-sm">
          <span>{lang === 'en' ? 'Question' : '问题'} {currentQ + 1} / {QUESTIONS.length}</span>
          <button onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} className="hover:text-zinc-300 transition-colors">
            {lang === 'en' ? 'Switch to 中文' : 'Switch to English'}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 rounded-full h-2 mb-12 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question Area */}
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 md:p-12 shadow-2xl min-h-[400px] flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-10 text-center text-zinc-100">
            {lang === 'en' ? q.en : q.zh}
          </h2>

          <div className="space-y-4">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.map)}
                className="w-full text-left p-5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-pink-500 transition-all duration-200 group flex justify-between items-center"
              >
                <span className="text-lg text-zinc-300 group-hover:text-white transition-colors">
                  {lang === 'en' ? opt.en : opt.zh}
                </span>
                <ChevronRight className="text-zinc-600 group-hover:text-pink-400 transition-colors" size={20} />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}