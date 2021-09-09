import React from 'react'

function Instruction(props) {
  return(
    <div>
      <div className="alert alert-info">
        <h4 className="alert-header">操作説明</h4>
        {
          props.fever ?
            <p>フィバ用説明</p>
          :
            <p>
              ←：左へ移動
              →：右へ移動
              ↓：ぷよを落下
              ↑：一手戻る
              z：左回転
              x：右回転

              スタートボタンでとこぷよ開始です
            </p>
        }
      </div>
    </div>
  )
}

export default Instruction
