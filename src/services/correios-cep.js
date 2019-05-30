
import fetch from 'isomorphic-unfetch';
import ServiceError from './errors';

function wrapperSOAPEnvelope(cep) {
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

function parseResponse(response) {
  return response.text();
}

function throwServiceError(error) {
  const serviceError = new ServiceError({
    message: error.message,
    service: 'Correios CEP',
  });

  throw serviceError;
}

const FetchCorreiosCEP = (cep) => {
  const url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente';
  const options = {
    method: 'POST',
    body: wrapperSOAPEnvelope(cep),
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      'cache-control': 'no-cache',
    },
  };

  return fetch(url, options)
    .then(parseResponse)
    .catch(throwServiceError);
};

export default FetchCorreiosCEP;
