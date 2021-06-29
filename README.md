# swim_org

[日本水泳連盟のHP](https://www.swim.or.jp/)からNews欄の最新情報をslackで通知してくれる

# Usage

<Slack側>
1. ワークスペースを設定→Menu→API
2. Create an app→From scratch
3. Permissions→Scopes→Add an OAuth Scopeでchat:write.public
4. Incoming WebhooksをOn→Add New Webhook to Workspace→チャンネル選択→`https://hooks.slack.com/services/`　以降をメモ
5. Basic Information→Verification Tokenをメモ
6. Display Informationをカスタマイズ→Save Changes

<GAS側>
1. Googleドライブ→新しいスプレッドシートを開く
2. ツール→スクリプトエディタ
3. main.gsをコピペ、メモった必要情報を記入


# Reference
https://github.com/Yutarotaro/NachanBot を参考にしています。
