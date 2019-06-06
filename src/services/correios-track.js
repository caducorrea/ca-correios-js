import fetch from 'isomorphic-unfetch';
import ServiceError from '../errors/service';

function wrapperEnvelope(cep) {
  const envelope = `<?xml version="1.0"?>\n
                          <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">\n  
                              <soapenv:Header />\n  
                              <soapenv:Body>\n    
                                  <cli:consultaCEP>\n      
                                  <cep>${cep}</cep>\n    
                                  </cli:consultaCEP>\n  
                              </soapenv:Body>\n
                          </soapenv:Envelope>`;
  return envelope;
}

function throwServiceError(error) {
  const serviceError = new ServiceError(error, 'Correios - CEP');

  throw serviceError;
}


export default function fetchCorreiosTrackService(trackNumber) {
  const url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente';
  const options = {
    method: 'POST',
    body: wrapperEnvelope(trackNumber),
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      'cache-control': 'no-cache',
    },
  };

  return fetch(url, options)
    .then(response => response)
    .catch(throwServiceError);
}
