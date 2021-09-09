import {useState} from 'react'
import Simulater from './Simulater'
import Controller from './Controller'
import Character from './Character'
import CustomTsumo from './CustomTsumo'
import CustomFeverTsumo from './CustomFeverTsumo'
import TsumoBeginning from './TsumoBeginning'
import SelectRensa from './SelectRensa'
import Instruction from './Instruction'

function Switch() {
  const [fever, setFever] = useState(false);
  const [start, setStart] = useState(false);
  const [toFirst, setTofirst] = useState(0);
  const [changeTsumo, setChangeTsumo] = useState(Date.now());
  const [customizedTsumo, setCustomizedTsumo] = useState([]);
  const [chara, setChara] = useState(0);
  const [beginning, setBeginning] = useState(0);
  const [rensaType, setRensaType] = useState({});
  const [active, setActive] = useState(false);
  const [alertCustom, setAlertCustom] = useState(false);

  const doSwitch = () => {
    setFever(!fever);
    setStart(false);
    setRensaType({});
  }

  return (
    <div>
      <div className="container">
        <div style={{
            float: 'left'
          }}>
          <Simulater
            fever={fever}
            start={start}
            toFirst={toFirst}
            changeTsumo={changeTsumo}
            customizedTsumo={customizedTsumo}
            alertCustom={alertCustom}
            chara={chara}
            beginning={beginning}
            rensaType={rensaType}
            active={active}
          />
        </div>
        <div style={{
            width: '760px',
            float: 'left',
            marginLeft: '5px'
          }}>
          {
            fever ?
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button style={{
                      backgroundColor: 'transparent',
                      color: '#007bff'
                    }} className="nav-link" onClick={doSwitch}>通常モード</button>
                </li>
                <li className="nav-item">
                  <button style={{
                      backgroundColor: 'transparent'
                    }} className="nav-link active" disabled>フィーバーモード</button>
                </li>
              </ul>
            :
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button style={{
                      backgroundColor: 'transparent'
                    }} className="nav-link active" disabled>通常モード</button>
                </li>
                <li className="nav-item">
                  <button style={{
                      backgroundColor: 'transparent',
                      color: '#007bff'
                    }} className="nav-link" onClick={doSwitch}>フィーバーモード</button>
                </li>
              </ul>
          }
          <div style={{
              width: '50%',
              float: 'left',
            }}>
            <Controller
              start={start}
              setStart={setStart}
              toFirst={toFirst}
              setTofirst={setTofirst}
              changeTsumo={changeTsumo}
              setChangeTsumo={setChangeTsumo}
            />
            <Character chara={chara} setChara={setChara} setStart={setStart}/>
            {
              fever &&
              <TsumoBeginning setBeginning={setBeginning} setStart={setStart}/>
            }
            {
              fever ?
                <CustomFeverTsumo chara={chara} setStart={setStart} customizedTsumo={customizedTsumo} setCustomizedTsumo={setCustomizedTsumo} beginning={beginning}/>
              :
                <CustomTsumo chara={chara} setStart={setStart} customizedTsumo={customizedTsumo} setCustomizedTsumo={setCustomizedTsumo} alertCustom={alertCustom} setAlertCustom={setAlertCustom}/>
            }
            {
              fever &&
              <SelectRensa setRensaType={setRensaType} active={active} setActive={setActive} setStart={setStart}/>
            }
          </div>
          <div style={{
              width: '50%',
              float: 'left',
            }}>
            <Instruction fever={fever}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Switch;
