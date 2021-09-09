import React, {useState, useEffect} from 'react'

function TsumoBeginning(props) {
  const doChange = (e) => {
    props.setBeginning(Number(e.target.value));
    props.setStart(false);
  }

  let beginning = [
    <option value={0} key={0}>
      ランダム
    </option>
  ]
  for(let i = 0; i < 16; i++) {
    beginning.push(
      <option value={i + 1} key={i + 1}>
        {(i + 1) + "手目"}
      </option>
    )
  }

  return(
    <div>
      <div className="form-group my-3">
        <label htmlFor="beginning">初手開始位置：</label>
        <select name="begin" id="beginning" className="form-control" onChange={doChange}>
          {beginning}
        </select>
      </div>
    </div>
  )
}

export default TsumoBeginning;
