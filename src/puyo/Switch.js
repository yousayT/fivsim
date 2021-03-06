import {useState} from 'react'
import Simulater from './Simulater'
import Controller from './Controller'
import Character from './Character'
import CustomTsumo from './CustomTsumo'
import CustomFeverTsumo from './CustomFeverTsumo'
import TsumoBeginning from './TsumoBeginning'
import SelectRensa from './SelectRensa'
import Instruction from './Instruction'
import MediaQuery from 'react-responsive'

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
      <MediaQuery query='(max-width: 767px)'>
        <div style={{
            width: '365px',
            margin: 'auto',
            display: 'block'
          }}>
          <div style={{
              width:'300px',
              margin: 'auto'
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
              width: '360px',
              marginTop: '10px',
              marginLeft: '2.5px',
              marginRight: '2.5px'
            }}>
            {
              fever ?
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button style={{
                        backgroundColor: 'transparent',
                        color: '#007bff'
                      }} className="nav-link" onClick={doSwitch}>???????????????</button>
                  </li>
                  <li className="nav-item">
                    <button style={{
                        backgroundColor: 'transparent'
                      }} className="nav-link active" disabled>????????????????????????</button>
                  </li>
                </ul>
              :
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button style={{
                        backgroundColor: 'transparent'
                      }} className="nav-link active" disabled>???????????????</button>
                  </li>
                  <li className="nav-item">
                    <button style={{
                        backgroundColor: 'transparent',
                        color: '#007bff'
                      }} className="nav-link" onClick={doSwitch}>????????????????????????</button>
                  </li>
                </ul>
            }
            <div style={{
                width: '100%'
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
                width: '100%',
                marginTop: '10px'
              }}>
              <Instruction fever={fever}/>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery query='(min-width: 768px)'>
        <div style={{
            width: '1100px',
            margin: 'auto',
            display: 'block'
          }}>
          <div style={{
              width:'310px',
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
                      }} className="nav-link" onClick={doSwitch}>???????????????</button>
                  </li>
                  <li className="nav-item">
                    <button style={{
                        backgroundColor: 'transparent'
                      }} className="nav-link active" disabled>????????????????????????</button>
                  </li>
                </ul>
              :
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button style={{
                        backgroundColor: 'transparent'
                      }} className="nav-link active" disabled>???????????????</button>
                  </li>
                  <li className="nav-item">
                    <button style={{
                        backgroundColor: 'transparent',
                        color: '#007bff'
                      }} className="nav-link" onClick={doSwitch}>????????????????????????</button>
                  </li>
                </ul>
            }
            <div style={{
                width: '50%',
                float: 'left',
                paddingRight: '5px'
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
                float: 'left'
              }}>
              <Instruction fever={fever}/>
            </div>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
}

export default Switch;
