/* =====================================================================
   メンバーの本と出版予定（参加者ラウンジ と 本ごとのページ book.html の両方で使う）
   メンバーから「本が出ます」と連絡が来たら、下の { } を1つ足すだけ。
   ラウンジでは自動で
     ・出版予定（発売月がこれから）→「これからの出版予定」に発売月の順で並ぶ
     ・発売済み → 「発売中のメンバーの本」に書影で並ぶ
   に振り分けられます。

   id       : 本ごとのページのアドレスになる（英数字。例 book.html?b=youryou）
   release  : 発売月 "2027-03"（日まで決まっていれば "2027-03-15"）
   stage    : "企画が通った" / "執筆中" / "予約受付中" / "クラファン挑戦中" / "発売中"
   tentative: true ＝ 書名が仮題
   cover    : images/member-books/ に置いた書影のファイル名（まだ無ければ "" ）
   links    : 押すと飛ぶボタン。type は下の LINK_TYPES のどれか
   sample   : true のあいだは「見本」の印がつく（本物が入ったら消す）
   ★出版予定は、本人と出版社がOKしたものだけ載せる（発表前の本もあるため）
   ===================================================================== */
var MEMBER_BOOKS = [
  {
    id: "kitto",
    sample: true,
    title: "きっとうまくいく",
    tentative: true,
    author: "岡崎かつひろ",
    publisher: "",
    release: "2027-03",
    stage: "執筆中",
    cover: "",
    catch: "（見本）出版予定の本は、書影がなくてもこのように載せられます。",
    message: "（見本）ここに著者からのひとことが入ります。",
    links: [
      { type: "sns", label: "著者のX", url: "https://x.com/zakihalz" }
    ]
  },
  {
    id: "youryou",
    sample: true,
    title: "要領のいい人が最初に考えること",
    author: "岡崎かつひろ",
    publisher: "三笠書房",
    release: "2026-07-25",
    stage: "発売中",
    cover: "youryou.jpg",
    catch: "（見本）ここに本のひとこと紹介が入ります。",
    message: "（見本）ここに著者からのひとことが入ります。本に込めた思いや、どんな人に読んでほしいかを書いてもらいます。",
    links: [
      { type: "amazon",       label: "Amazonで見る",               url: "https://www.amazon.co.jp/dp/4837941001" },
      { type: "rakuten",      label: "楽天ブックスで見る",          url: "https://books.rakuten.co.jp/search?sitem=%E8%A6%81%E9%A0%98%E3%81%AE%E3%81%84%E3%81%84%E4%BA%BA%E3%81%8C%E6%9C%80%E5%88%9D%E3%81%AB%E8%80%83%E3%81%88%E3%82%8B%E3%81%93%E3%81%A8" },
      { type: "crowdfunding", label: "クラウドファンディング（見本）", url: "#" },
      { type: "event",        label: "出版記念イベント（見本）",     url: "#" },
      { type: "sns",          label: "著者のX",                    url: "https://x.com/zakihalz" }
    ]
  }
];

var LINK_TYPES = {
  amazon:       { name: "Amazon",     color: "#ff9900", ink: "#1d1a17" },
  rakuten:      { name: "楽天ブックス", color: "#bf0000", ink: "#fff" },
  crowdfunding: { name: "クラファン",   color: "#0b8043", ink: "#fff" },
  event:        { name: "イベント",     color: "#e8621c", ink: "#fff" },
  voicy:        { name: "Voicy",       color: "#f6c600", ink: "#1d1a17" },
  youtube:      { name: "YouTube",     color: "#d81f26", ink: "#fff" },
  sns:          { name: "SNS",         color: "#1d1a17", ink: "#fff" },
  site:         { name: "サイト",       color: "#1f6feb", ink: "#fff" },
  other:        { name: "リンク",       color: "#6b645c", ink: "#fff" }
};

/* 発売月の表示（"2027-03" → "2027年3月"、"2026-07-25" → "2026年7月25日"） */
function releaseLabel(r){
  if(!r) return "";
  var p=r.split("-");
  return p[0]+"年"+(+p[1])+"月"+(p[2]?(+p[2])+"日":"");
}
