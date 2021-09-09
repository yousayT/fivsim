import React, {useState, useEffect} from 'react'

function TsumoItem(props) {
  // tsumoColor1: 軸ぷよの色　tsumoColor2: 子ぷよの色
  const [tsumoColor1, setTsumoColor1] = useState(props.color1);
  const [tsumoColor2, setTsumoColor2] = useState(props.color2);

  const customColor1 = (e) => {
    switch (e.target.getAttribute('fill')) {
      case 'white':
        setTsumoColor1('red');
        props.setCustomColorData([...props.customColorData, {count: props.count, num: 1, color: 'r'}])
        break;
      case 'red':
        setTsumoColor1('lime');
        props.setCustomColorData([...props.customColorData, {count: props.count, num: 1, color: 'g'}])
        break;
      case 'lime':
        setTsumoColor1('dodgerblue');
        props.setCustomColorData([...props.customColorData, {count: props.count, num: 1, color: 'b'}])
        break;
      case 'dodgerblue':
        setTsumoColor1('yellow');
        props.setCustomColorData([...props.customColorData, {count: props.count, num: 1, color: 'y'}])
        break;
      case 'yellow':
        setTsumoColor1('white');
        props.setCustomColorData([...props.customColorData, {count: props.count, num: 1, color: 'w'}])
        break;
      default:
        console.error('ツモのカスタム中に予期せぬエラーが起きました。');
    }
  }
  const customColor2 = (e) => {
    switch (e.target.getAttribute('fill')) {
      case 'white':
        setTsumoColor2('red');
        props.setCustomColorData([...props.customColorData, {count: props.count, num: 2, color: 'r'}])
        break;
      case 'red':
        setTsumoColor2('lime');
        props.setCustomColorData([...props.customColorData, {count: props.count, num: 2, color: 'g'}])
        break;
      case 'lime':
        setTsumoColor2('dodgerblue');
        props.setCustomColorData([...props.customColorData, {count: props.count, num: 2, color: 'b'}])
        break;
      case 'dodgerblue':
        if(props.count === 2) {
          setTsumoColor2('white');
          props.setCustomColorData([...props.customColorData, {count: props.count, num: 2, color: 'w'}])
        } else {
          setTsumoColor2('yellow');
          props.setCustomColorData([...props.customColorData, {count: props.count, num: 2, color: 'y'}])
        }
        break;
      case 'yellow':
        setTsumoColor2('white');
        props.setCustomColorData([...props.customColorData, {count: props.count, num: 2, color: 'w'}])
        break;
      default:
        console.error('ツモのカスタム中に予期せぬエラーが起きました。');
    }
  }

  let tsumoItem;
  if(props.count === 1 && !props.fever) {
    switch (props.type) {
      case '2':
        tsumoItem = (
          <svg>
            <circle className='user-select-none' cx='30px' cy='30px' r='27.5px' fill='lime' stroke='#666' strokeWidth='2px'/>
            <circle className='user-select-none' cx='30px' cy='90px' r='27.5px' fill='red' stroke='#666' strokeWidth='2px'/>
          </svg>
        )
        break;
      case '|':
        tsumoItem = (
          <svg>
            <rect className='user-select-none' x='2.5px' y='2.5px' rx='30px' ry='30px' width='55px' height='115px' fill='red' stroke='#666' strokeWidth='2px'/>
            <circle className='user-select-none' cx='90px' cy='90px' r='27.5px' fill='lime' stroke='#666' strokeWidth='2px'/>
          </svg>
        )
        break;
      case '_':
        tsumoItem = (
          <svg>
            <rect className='user-select-none' x='2.5px' y='62.5px' rx='30px' ry='30px' width='115px' height='55px' fill='red' stroke='#666' strokeWidth='2px'/>
            <circle className='user-select-none' cx='30px' cy='30px' r='27.5px' fill='lime' stroke='#666' strokeWidth='2px'/>
          </svg>
        )
        break;
      default:
        console.error('存在しないツモタイプです。');
    }
  } else if(props.count === 2 && !props.fever) {
    switch (props.type) {
      case '2':
        tsumoItem = (
          <svg>
            <circle className='user-select-none' cx='30px' cy='30px' r='27.5px' fill={tsumoColor2} stroke='#666' strokeWidth='2px' onClick={customColor2}/>
            <circle className='user-select-none' cx='30px' cy='90px' r='27.5px' fill='dodgerblue' stroke='#666' strokeWidth='2px'/>
          </svg>
        )
        break;
      case '|':
        tsumoItem = (
          <svg>
            <rect className='user-select-none' x='2.5px' y='2.5px' rx='30px' ry='30px' width='55px' height='115px' fill='dodgerblue' stroke='#666' strokeWidth='2px'/>
            <circle className='user-select-none' cx='90px' cy='90px' r='27.5px' fill={tsumoColor2} stroke='#666' strokeWidth='2px' onClick={customColor2}/>
          </svg>
        )
        break;
      case '_':
        tsumoItem = (
          <svg>
            <rect className='user-select-none' x='2.5px' y='62.5px' rx='30px' ry='30px' width='115px' height='55px' fill='dodgerblue' stroke='#666' strokeWidth='2px'/>
            <circle className='user-select-none' cx='30px' cy='30px' r='27.5px' fill={tsumoColor2} stroke='#666' strokeWidth='2px' onClick={customColor2}/>
          </svg>
        )
        break;
      default:
        console.error('存在しないツモタイプです。');
    }
  } else {
    switch (props.type) {
      case '2':
        tsumoItem = (
          <svg>
            <circle className='user-select-none' cx='30px' cy='30px' r='27.5px' fill={tsumoColor2} stroke='#666' strokeWidth='2px' onClick={customColor2}/>
            <circle className='user-select-none' cx='30px' cy='90px' r='27.5px' fill={tsumoColor1} stroke='#666' strokeWidth='2px' onClick={customColor1}/>
          </svg>
        )
        break;
      case '|':
        tsumoItem = (
          <svg>
            <rect className='user-select-none' x='2.5px' y='2.5px' rx='30px' ry='30px' width='55px' height='115px' fill={tsumoColor1} stroke='#666' strokeWidth='2px' onClick={customColor1}/>
            <circle className='user-select-none' cx='90px' cy='90px' r='27.5px' fill={tsumoColor2} stroke='#666' strokeWidth='2px' onClick={customColor2}/>
          </svg>
        )
        break;
      case '_':
        tsumoItem = (
          <svg>
            <rect className='user-select-none' x='2.5px' y='62.5px' rx='30px' ry='30px' width='115px' height='55px' fill={tsumoColor1} stroke='#666' strokeWidth='2px' onClick={customColor1}/>
            <circle className='user-select-none' cx='30px' cy='30px' r='27.5px' fill={tsumoColor2} stroke='#666' strokeWidth='2px' onClick={customColor2}/>
          </svg>
        )
        break;
      case '4':
        tsumoItem = (
          <svg>
            <rect className='user-select-none' x='2.5px' y='2.5px' rx='30px' ry='30px' width='55px' height='115px' fill={tsumoColor1} stroke='#666' strokeWidth='2px' onClick={customColor1}/>
            <rect className='user-select-none' x='62.5px' y='2.5px' rx='30px' ry='30px' width='55px' height='115px' fill={tsumoColor2} stroke='#666' strokeWidth='2px' onClick={customColor2}/>
          </svg>
        )
        break;
      case 'o':
        tsumoItem = (
          <svg>
            <circle className='user-select-none' cx='60px' cy='60px' r='57.5px' fill={tsumoColor1} stroke='#666' strokeWidth='2px' onClick={customColor1}/>
          </svg>
        )
        break;
      default:
        console.error('存在しないツモタイプです。');
    }
  }

  useEffect(() => {
    if(props.clearTsumo){
      setTsumoColor1('white');
      setTsumoColor2('white');
      props.setClearTsumo(false);
    }
  }, [props.clearTsumo])

  return (
    <div>
      {
        props.fever ?
          <div className='h5'>
            {props.count + props.beginning - 1}手目:
          </div>
        :
          <div className='h5'>
            {props.count}手目:
          </div>
      }
      <div style={{
          width: '120px',
          height: '120px',
          margin: '5px'
        }}>
        {tsumoItem}
      </div>
    </div>
  )
}

export default TsumoItem;
