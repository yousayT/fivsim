import React, {useState, useEffect} from 'react'

function Controller(props) {

  const doStart = () => {
    props.setStart(true);
  }

  const doToFirst = () => {
    props.setTofirst(props.toFirst + 1);
  }

  const doChangeTsumo = () => {
    props.setChangeTsumo(Date.now());
  }

  return (
    <div>
      {props.start ?
        <div>
          <div className="row no-gutters my-3">
            <button className="btn btn-primary col ml-2 mr-1" disabled>スタート</button>
            <button className="btn btn-primary col ml-1 mr-2" onClick={doToFirst}>初手に戻す</button>
          </div>
          <div className="row no-gutters mb-3">
            <button className="btn btn-secondary col mx-2" onClick={doChangeTsumo}>ツモ配色を変えてリセット</button>
          </div>
        </div>
      :
        <div>
          <div className="row no-gutters my-3">
            <button className="btn btn-primary col ml-2 mr-1" onClick={doStart}>スタート</button>
            <button className="btn btn-primary col ml-1 mr-2" disabled>初手に戻す</button>
          </div>
          <div className="row no-gutters mb-3">
            <button className="btn btn-secondary col mx-2" disabled>ツモ配色を変えてリセット</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Controller
