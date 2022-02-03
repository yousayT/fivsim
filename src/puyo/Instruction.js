import React from 'react'

function Instruction(props) {
  return(
    <div>
      <div className="alert alert-info">
        <h4 className="alert-header">操作説明</h4>
        {
          props.fever ?
            <p>
              ←：左へ移動<br/>
              →：右へ移動<br/>
              ↓：ぷよを落下<br/>
              ↑：一手戻る<br/>
              z：左回転<br/>
              x：右回転<br/><br/>

              ・スタートボタンでフィバのばし開始です。<br/>
              ・一度でも消すとそれ以上ぷよを置けなくなります。<br/>
              <strong>注意</strong>：キャラやツモカスタム、れんさのタネなどの設定を変えると<strong>盤面がリセットされます。</strong><br/>
              <br/>
              詳しい説明：<a href="https://puyo-camp.jp/posts/146537">フィーバー用のとこぷよツールを作ってみました！_ぷよぷよキャンプ</a>
            </p>
          :
            <p>
              ←：左へ移動<br/>
              →：右へ移動<br/>
              ↓：ぷよを落下<br/>
              ↑：一手戻る<br/>
              z：左回転<br/>
              x：右回転<br/>
              p：ゴーストを表示/非表示<br/><br/>

              スタートボタンでとこぷよ開始です。<br/>
              <strong>注意</strong>：キャラやツモカスタムの設定を変えると<br/><strong>盤面がリセットされます。</strong><br/>
              <br/>
              詳しい説明：<a href="https://puyo-camp.jp/posts/146537">フィーバー用のとこぷよツールを作ってみました！_ ぷよぷよキャンプ</a>
            </p>
        }
      </div>
    </div>
  )
}

export default Instruction
