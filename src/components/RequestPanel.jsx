import React, { useState } from 'react';
import { 
  Container, Grid
} from 'semantic-ui-react';
import InputBar from './InputBar';
import RequestTabGroup from './RequestTabGroup';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { convertKeyValueToObject } from './../utilities/helpers';


const styles = {
  'padding': '2em'
}

const keyPairInitState = [
  {
    id: uuidv4(),
    keyItem : '',
    valueItem : ''
  }
] 

const RequestPanel = ({ setResponse }) => {

  const [ url, setUrl ] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [ httpMethod, setHttpMethod ] = useState('GET');
  
  // const [ view, setView ] = useState(null);
  const [ doc, setDoc ] = useState('{\n\t\n}')

  const [ queryParams, setQueryParams ] = useState(keyPairInitState);
  const [ headers, setHeaders ] = useState(keyPairInitState);
  

  const handleOnInputSend = async () => {

    // const requestBody = view.state.doc.toString();
    const requestBody = doc.toString();
    console.log('url ', url);
    console.log('http method', httpMethod);
    console.log('headers', headers);
    console.log('query params ', queryParams)
    console.log('body ', requestBody);

    let data;
    try {
      data = JSON.parse(requestBody);
    } catch (e) {
      alert('Something is wrong with the JSON data.')
    }

    try {
      const response = await axios({
        url: url,
        method: httpMethod,
        params: convertKeyValueToObject(queryParams),
        headers: convertKeyValueToObject(headers),
        data
      });

      console.log(response);
      setResponse(response);

    } catch (e) {
      return e;
    }

  }

  return (
    <div style={styles}>
      <Container fluid>
        <InputBar
          url={url} 
          setUrl={setUrl}
          httpMethod={httpMethod}
          setHttpMethod={setHttpMethod}
          onInputSend={handleOnInputSend}/>
        <br/>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column width={16}>
              <RequestTabGroup
                doc={'{\n\t\n}'}
                setDoc={setDoc}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                headers={headers}
                setHeaders={setHeaders}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>

  )
}

export default RequestPanel;