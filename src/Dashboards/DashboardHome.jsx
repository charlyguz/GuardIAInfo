import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/images/background.jpg';
import { VideoCameraIcon, MegaphoneIcon, CameraIcon, CpuChipIcon } from '@heroicons/react/24/solid';
import Camera from './Camera';
import { MultiCameras } from '../components/MultiCameras';
import { Button, Modal } from 'antd';
import { useFetcher } from 'react-router-dom';


export const DashboardHome = () => {
  const [selected, setSelected] = useState('Cámaras');

  const [modalesState, setModalesState] = useState(0);

  const [danger_prob, setDanger_prob] = useState(0);

  const url = "/";

  useEffect(() => {
    if(danger_prob > 0.3 && danger_prob<0.7)
      setModalesState(1)
  }, [danger_prob])
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setDanger_prob(data.valor);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    const interval = setInterval(fetchData, 500); // Realiza la solicitud cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);
  

  const handleSelection = (option) => {
    if(option === "SOS")
      showModal()

    console.log(option)
    setSelected(option);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

  return (
    <div className="flex">
      <div className="relative w-1/5 h-screen bg-opacity-100 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-lg" 
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <nav className="relative z-10 px-4 mt-6">
          <h2 className="text-4xl font-extrabold text-white my-2 h-28">GuardIA Home</h2>
          <ul className="space-y-4 text-2xl">
          <li 
              className={`flex items-center space-x-3 cursor-pointer ${selected === 'Cámaras' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Cámaras')}
            > 
              <CameraIcon className={`h-10 w-10 ${selected === 'Cámaras' ? 'text-black' : 'text-white'}`} />
              <span>Cámaras</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Entrada' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Entrada')}
            >
              <span>Entrada</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Patio' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Patio')}
            >
              <span>Patio</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Sala' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Sala')}
            >
              <span>Sala</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Cócina' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Cócina')}
            >
              <span>Cócina</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Garaje' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Garaje')}
            >
              <span>Garaje</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ${selected === 'SOS' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('SOS')}
            > 
              <MegaphoneIcon className={`h-10 w-10 ${selected === 'SOS' ? 'text-black rounded-lg' : 'text-white'}`} />
              <span>SOS</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ${selected === 'Grabaciones' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Grabaciones')}
            > 
              <VideoCameraIcon className={`h-10 w-10 ${selected === 'Grabaciones' ? 'text-black rounded-lg' : 'text-white'}`} />
              <span>Grabaciones</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ${selected === 'IA' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('IA')}
            > 
              <CpuChipIcon className={`h-10 w-10 ${selected === 'IA' ? 'text-black rounded-lg' : 'text-white'}`} />
              <span>IA</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold">Dashboard Home</h1>
        <div className="flex-grow p-8">
          {
            selected === 'Cámaras' ? <MultiCameras/> : <Camera label = { selected } />

          }
      </div>
      <Modal
                title={<span className='text-2xl font-bold text-white'>SOS</span>}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={'Si'}
                cancelText='Cancelar'
                centered={true}

                styles={{
                 
                  
                  content: {
                    background: 'rgba(182, 43, 43, 0.64)',
                    color: 'white'
                  },

                  header: {
                    background: 'transparent'
                  },
                  
                }}
      >
      <span  className='text-xl font-normal text-white'>¿Esta seguro de alertar a las autoridades?</span>

      </Modal>
      {/* Modal Alerta */}
      <Modal
                title={<span className='text-2xl font-bold text-white'>Actividad Sopechosa</span>}
                visible={modalesState === 1}
                onOk={handleOk}
                onCancel={() => setModalesState(0)}
                okText={'Revisar'}
                cancelText='Cerrar'
                centered={true}

                styles={{
                 
                  
                  content: {
                    background: 'rgba(212, 191, 35, 0.64)',
                    color: 'white'
                  },

                  header: {
                    background: 'transparent'
                  },
                  
                }}
      >
      <span  className='text-xl font-normal text-white'>Se ha detectado posible actividad sospechosa!</span>

      </Modal>

      <Modal
                title={<span className='text-2xl font-bold text-white'>Alerta de Peligro</span>}
                visible={modalesState === 2}
                onOk={handleOk}
                onCancel={() => setModalesState(0)}
                okText={'Alertar a las autoridades'}
                cancelText='Cerrar'
                centered={true}

                styles={{
                 
                  
                  content: {
                    background: 'rgba(206, 26, 26, 0.64)',
                    color: 'white'
                  },

                  header: {
                    background: 'transparent'
                  },
                  
                }}
      >
      <span  className='text-xl font-normal text-white'>Se ha detectado una situacion de peligro!</span>

      </Modal>
      <Button type="primary" onClick={() => setModalesState(2)}>
                Open Modal
        </Button>
      </div>
    </div>
  );
};

