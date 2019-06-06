/* eslint no-param-reassign: "error" */
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */

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

function parseXMLResponse(xmlString) {
  try {
    const returnStatement = xmlString.replace(/\r?\n|\r/g, '').match(/<return>(.*)<\/return>/)[0] || '';
    const cleanReturnStatement = returnStatement.replace('<return>', '').replace('</return>', '');
    const parsedReturnStatement = cleanReturnStatement
      .split(/</)
      .reduce((result, exp) => {
        const splittenExp = exp.split('>');
        if (splittenExp.length > 1 && splittenExp[1].length) {
          result[splittenExp[0]] = splittenExp[1];
        }
        return result;
      }, {});

    return parsedReturnStatement;
  } catch (e) {
    throw new Error('Não foi possível interpretar o XML de resposta.');
  }
}

function extractValuesFromSuccessResponse(xmlObject) {
  return {
    cep: xmlObject.cep,
    state: xmlObject.uf,
    city: xmlObject.cidade,
    neighborhood: xmlObject.bairro,
    street: xmlObject.end,
  };
}

function parseResponse(response) {
  return response.text()
    .then(parseXMLResponse)
    .then(extractValuesFromSuccessResponse);
}

function throwServiceError(error) {
  const serviceError = new ServiceError(error, 'Correios - CEP');

  throw serviceError;
}

export default function fetchCorreiosCepService(cepNumber) {
  const url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente';
  const options = {
    method: 'POST',
    body: wrapperEnvelope(cepNumber),
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      'cache-control': 'no-cache',
    },
  };

  return fetch(url, options)
    .then(parseResponse)
    .catch(throwServiceError);
}
