import React, {useState, useEffect} from 'react'

function Description(props) {
  const[is2, setIs2] = useState(false);
  let desc;
  switch (props.type) {
    case '2':
      desc = (
        <div style={{
            width: '12px',
            height: '24px',
            marginBottom: '10px',
            float: 'left'
          }}>
          <svg>
            <circle className='user-select-none' cx='6px' cy='6.5px' r='5px' fill='white' stroke='#007bff' strokeWidth='1px'/>
            <circle className='user-select-none' cx='6px' cy='17.5px' r='5px' fill='white' stroke='#007bff' strokeWidth='1px'/>
          </svg>
        </div>
      )
      break;
    case '|':
      desc = (
        <div style={{
            width: '24px',
            height: '24px',
            marginBottom: '10px',
            float: 'left'
          }}>
          <svg>
            <rect className='user-select-none' x='1.5px' y='1.5px' rx='5px' ry='5px' fill='white' width='10px' height='21px' stroke='#007bff' strokeWidth='1px'/>
            <circle className='user-select-none' cx='18px' cy='17.5px' r='5px' fill='white' stroke='#007bff' strokeWidth='1px'/>
          </svg>
        </div>
      )
      break;
    case '_':
      desc = (
        <div style={{
            width: '24px',
            height: '24px',
            marginBottom: '10px',
            float: 'left'
          }}>
          <svg>
            <rect className='user-select-none' x='1.5px' y='12.5px' rx='5px' ry='5px' width='21px' height='10px' fill='white' stroke='#007bff' strokeWidth='1px'/>
            <circle className='user-select-none' cx='6.5px' cy='6.5px' r='5px' fill='white' stroke='#007bff' strokeWidth='1px'/>
          </svg>
        </div>
      )
      break;
    case '4':
      desc = (
        <div style={{
            width: '24px',
            height: '24px',
            marginBottom: '10px',
            float: 'left'
          }}>
          <svg>
            <rect className='user-select-none' x='1px' y='1.5px' rx='5px' ry='5px' width='10px' height='21px' fill='white' stroke='#007bff' strokeWidth='1px'/>
            <rect className='user-select-none' x='12.5px' y='1.5px' rx='5px' ry='5px' width='10px' height='21px' fill='white' stroke='#007bff' strokeWidth='1px'/>
          </svg>
        </div>
      )
      break;
    case 'o':
      desc = (
        <div style={{
            width: '24px',
            height: '24px',
            marginBottom: '10px',
            float: 'left'
          }}>
          <svg>
            <circle className='user-select-none' cx='12px' cy='12px' r='11px' fill='white' stroke='#007bff' strokeWidth='1px'/>
          </svg>
        </div>
      )
      break;
    default:
  }

  return (
    <div>
      {desc}
    </div>
  )
}

export default Description;
