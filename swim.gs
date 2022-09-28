var CHANNEL_ACCESS_TOKEN = '[]'; // Channel_access_tokenを登録
function main(){
  scraping()
  scraping1()
}

function scraping() {
  var url = 'https://swim.or.jp/news/';
  var response = UrlFetchApp.fetch(url);//JavaScript で動的にコンテンツを生成しているサイトでは UrlFetchApp でコンテンツを取得できない。
  console.log("response: ",response)
  var json = response.getContentText();
  //console.log("json: ",json)
  var link0 = find(json, '<ul class="news-list">','</li>');
  console.log("link0:",link0)
  var flag = find(link0,'<span class="category">競','</span>');
  console.log(flag)
  var link = find(link0, '<a href="/news/','" class="block"');
  console.log("link is ",url+link)
  var info = url+link
  // var info = find(link,'<span class="info">','::after');
  // console.log("info is ",info)
  var header = find(link0,'<p class="title">','</p>');
  var date = find(link0,'<div class="date">','</span>');
  console.log("title is ",header)
  var sheet = SpreadsheetApp.getActiveSheet(); 
  var lastRow = sheet.getLastRow();
  console.log("lastRow: ",lastRow)
  var range = sheet.getDataRange();// そのシート上の値が存在するセル範囲を取得
  var values = range.getValues();// そのセル範囲にある値の多次元配列を取得
  var flag = false
  for (var i = 0; i < values.length; i++) {
    //console.log("val",values[i][0])
    pre_info = values[i][0]
    if (info == pre_info){
      console.log("matched!")
      flag = true
    }
  }
  //var pre_info = sheet.getRange(lastRow,1).getValue();
  //console.log("pre_info is ",pre_info)
  var post_url = "https://hooks.slack.com/services/"
  +"[必要情報]"; //postメソッドのurl
  if(!flag && flag=='泳'){//更新
    sheet.getRange(lastRow+1, 1).setValue(info);
    var jsondata = {
      "text": date+'\n'+header+'\n'+info,
      "attachments": attachments, //リッチなメッセージを送る用データ
    }
    var payload = JSON.stringify(jsondata);
    var attachments = JSON.stringify([
      {
        title_link: info,
        text: "上記リンクをクリックすると対象のページやファイルを表示します。" //インデント内に表示されるテキスト
      }
    ]);
    var options = {
        "method": "post",
        "contentType": "application/json",
        "payload":payload,
    };
    UrlFetchApp.fetch(post_url, options);
  }
}

function scraping1() {
  var url = 'https://swim.or.jp/committee_news/category/c1/';
  var url2 = 'https://swim.or.jp/committee_news/';
  var response = UrlFetchApp.fetch(url);//JavaScript で動的にコンテンツを生成しているサイトでは UrlFetchApp でコンテンツを取得できない。
  console.log("response: ",response)
  var json = response.getContentText();
  //console.log("json: ",json)
  var link0 = find(json, '<ul class="news-list">','</li>');
  console.log("link0:",link0)
  // var flag = find(link0,'<span class="category -wide">競泳委員会','</span>');
  // console.log("flag is:",flag)
  var flag = find(link0,'<span class="category -wide">競','</span>');
  console.log("flag is:",flag)
  // var flag = find(link0,'<span class="category -wide">地','</span>');
  // console.log("flag is:",flag)
  var link = find(link0, '<a href="/committee_news/','" class="block"');
  console.log("link is ",url2+link)
  var info = url2+link
  // var info = find(link,'<span class="info">','::after');
  // console.log("info is ",info)
  var header = find(link0,'<p class="title">','</p>');
  var date = find(link0,'<div class="date">','</span>');
  console.log("title is ",header)
  var sheet = SpreadsheetApp.getActiveSheet(); 
  var lastRow = sheet.getLastRow();
  console.log("lastRow: ",lastRow)
  var range = sheet.getDataRange();// そのシート上の値が存在するセル範囲を取得
  var values = range.getValues();// そのセル範囲にある値の多次元配列を取得
  var flag = false
  for (var i = 0; i < values.length; i++) {
    //console.log("val",values[i][0])
    pre_info = values[i][0]
    if (info == pre_info){
      console.log("matched!")
      flag = true
    }
  }
  //var pre_info = sheet.getRange(lastRow,1).getValue();
  //console.log("pre_info is ",pre_info)
  var post_url = "https://hooks.slack.com/services/"
  +"T026B3697G9/B026UHYUDFB/iQIeMK3jXYJMywQqTjrmiPe7"; //postメソッドのurl
  if(!flag && flag=='泳委員会'){//更新
    sheet.getRange(lastRow+1, 1).setValue(info);
    var jsondata = {
      "text": date+'\n'+header+'\n'+info,
      "attachments": attachments, //リッチなメッセージを送る用データ
    }
    var payload = JSON.stringify(jsondata);
    var attachments = JSON.stringify([
      {
        title_link: info,
        text: "上記リンクをクリックすると対象のページやファイルを表示します。" //インデント内に表示されるテキスト
      }
    ]);
    var options = {
        "method": "post",
        "contentType": "application/json",
        "payload":payload,
    };
    UrlFetchApp.fetch(post_url, options);
  }
}

function find(text, from, to) {
  var fromIndex = text.indexOf(from);//textの中からfromを見つける。返り値はindex
  if (fromIndex === -1) return '';
  text = text.substring(fromIndex + from.length);
  //console.log("text is ",from,"\n",text)
  var toIndex = text.indexOf(to);
  if (toIndex === -1) return '';
  console.log(from,"and ",to, "of return is ","\n",text.substring(0, toIndex))
  return text.substring(0, toIndex);
}
