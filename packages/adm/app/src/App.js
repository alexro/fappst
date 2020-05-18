import React, { Children, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import './assets/App.scss';
import ErrorBoundary from './components/ErrorBoundary';
import Modal from './components/Modal';
import { ConditionsList } from './modules/conditionsList/ConditionsList';
import SimpleForm from './modules/SimpleForm';
import { v4 as uuidv4 } from 'uuid';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function showResults(values) {
  console.log(values);
  await sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
}

const FormContext = React.createContext();
const FormData = React.createContext();

function cloneChildren(children, props) {
  if (!children) {
    return null;
  } else if (children.length) {
    return children.map((child) => React.cloneElement(child, props));
  } else {
    return React.cloneElement(children, props);
  }
}

function format(data) {
  return {
    top: {
      items: [
        { a: 1, b: 2, blocks: { items: [] }, $collapsed: true },
        {
          a: 11,
          b: 21,
          blocks: {
            items: [
              { k1: 'k1', k2: 'k2' },
              { k1: 'k11', k2: 'k21' },
            ],
          },
        },
      ],
    },
  };
}

class ContactForm extends React.Component {
  parse(data) {
    console.log(data);
  }

  render() {
    return (
      // <Form2 data={format()} onSubmit={this.parse}>
      //   <FS2 id="-2">
      //     <FSR id="top">
      //       <FS id="-1">
      //         <FSC>Collapsed</FSC>
      //         <hr />
      //         <F id="a" />
      //         <F id="b" />
      //         <hr />
      //         <FSR id="blocks">
      //           <FS id="0">
      //             <FS id="1">
      //               <hr />
      //               <F id="k1">
      //                 <input />
      //                 <V />
      //               </F>
      //             </FS>
      //             <FS id="2">
      //               <F id="k2" />
      //               <hr />
      //             </FS>
      //           </FS>
      //         </FSR>
      //       </FS>
      //     </FSR>
      //   </FS2>
      // </Form2>
      <Form2 data={{ kuku: format() }} onSubmit={this.parse}>
        <FS2 id="kuku">
          <FSR2 id="top">
            <FS2>
              <hr />
              <F2 id="a" />
              <F2 id="b" />
              <hr />
              <FSR2 id="blocks">
                <FS2>
                  <FS2>
                    <hr />
                    <F2 id="k1">
                      <input />
                      <V />
                    </F2>
                  </FS2>
                  <FS2>
                    <F2 id="k2" />
                    <hr />
                  </FS2>
                </FS2>
              </FSR2>
            </FS2>
          </FSR2>
        </FS2>
        <FF />
      </Form2>
    );
  }
}

class V extends React.Component {
  render() {
    if (this.props.errors.length === 0) {
      return null;
    }
    return <div>{this.props.errors[0]}</div>;
  }
}

class FD extends React.Component {
  render() {
    // console.clear();
    console.log('FD', this.props.data);
    return cloneChildren(this.props.children, { data: this.props.data });
  }
}

class Form extends React.Component {
  render() {
    return cloneChildren(this.props.children, { data: this.props.data });
  }
}

function Form2({ data, children }) {
  const [values, setValues] = useState(data);

  function getValues() {
    return values;
  }

  function refresh() {
    setValues(Object.assign({}, values));
  }

  return (
    <FormContext.Provider value={{ getValues, refresh }}>
      <FormData.Provider value={values}>{children}</FormData.Provider>
    </FormContext.Provider>
  );
}

function FS2({ id, children }) {
  const data = useContext(FormData);
  return (
    <>
      <FormData.Provider value={id ? data[id] : data}>{children}</FormData.Provider>
    </>
  );
}

function FSR2({ id, children }) {
  const form = useContext(FormContext);
  const values = useContext(FormData);

  const data = values[id];
  // console.log('FSR', values);

  return data.items.map((item, index) => {
    let key = item['$$key'];
    if (!key) {
      key = uuidv4();
      item['$$key'] = key;
    }
    return (
      <FormData.Provider key={key} value={item}>
        {children}
      </FormData.Provider>
    );
  });
}

function FF() {
  const form = useContext(FormContext);
  console.log(form.getValues());

  return null;
}

function FS3() {
  const data = useContext(FormData);
  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

function F2({ id }) {
  const data = useContext(FormData);
  return <div>{data[id]}</div>;
}

class F extends React.Component {
  blur = () => {
    console.log('blur');
  };

  render() {
    if (!this.props.children) {
      return <div>{this.props.data}</div>;
    }

    return (
      <span>
        {cloneChildren(this.props.children, {
          value: this.props.data,
          errors: ['aaaaa vse propalo'],
        })}
      </span>
    );
  }
}

class FSR extends React.Component {
  render() {
    console.log('repeater', this.props.id, this.props.data);
    const items = this.props.data.items;
    const sections = items.map((item, index) => cloneChildren(Children.only(this.props.children), { data: item }));
    return sections;
  }
}

function validatePasswords(state, id1, id2) {
  if (state[id1] !== state[id2]) {
    return null;
  }
}

class FS extends React.Component {
  static typeName = 'FS';

  blur = () => {
    console.log('blur FC', this.props.id);
  };

  render() {
    const isCollapsed = this.props.data.$collapsed;

    const propsChildren = this.props.children.length ? this.props.children : [this.props.children];
    const children = propsChildren.map((child) => {
      if (!child || !child.type || !child.type.name) {
        return isCollapsed ? null : child;
      }

      if (child.type.name === FS.typeName) {
        return isCollapsed ? null : cloneChildren(child, { data: this.props.data });
      } else if (child.type.name === FSC.typeName) {
        return isCollapsed ? cloneChildren(child, { data: this.props.data }) : null;
      } else {
        return isCollapsed ? null : cloneChildren(child, { data: this.props.data[child.props.id] });
      }
    });

    return (
      <div id={this.props.id} onBlur={this.blur}>
        {children}
      </div>
    );
  }
}

class FSC extends React.Component {
  static typeName = 'FSC';

  render() {
    return <div style={{ border: 'solid 1px red' }}>{this.props.children}</div>;
  }
}

class Field extends React.Component {
  constructor(props) {
    super();
    this.state = { mounted: !!document.getElementById(props.id) };
  }

  portal = null;

  componentDidMount() {
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    this.portal = null;
  }

  render() {
    console.log('field render', this.props.state);
    const {
      portal,
      props: { children, form, id, state },
      state: { mounted },
    } = this;

    if (!mounted) {
      return null;
    }

    let child = Children.only(children);
    child = React.cloneElement(child, { form: form, id: id, value: state[id] });
    return ReactDOM.createPortal(child, document.getElementById(id));
  }
}

class FieldInput extends React.Component {
  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.form.handleChange(e, this, this.props.id, e.target.value);
  }

  render() {
    console.log('input render');
    return <input {...this.props} value={this.props.value} onChange={this.handleChange} />;
  }
}

function NavBar(props) {
  return (
    <div>
      <a href="https://nix.ru">Nix</a>
      <div id="log" style={{ display: 'inline-block' }}></div>
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <NavBar />
      <div className="App">
        <div>{location.pathname}</div>
        <hr />
        {/* <SimpleForm onSubmit={showResults} /> */}
        <hr />
        <ConditionsList />
      </div>
      {/* <Modal>
        <h1 className="modal">cola mola</h1>
      </Modal> */}
      {/* <Form>
        <Field id="col1">
          <FieldInput />
        </Field>
        <Field id="col2">
          <FieldInput />
        </Field>
        <Field id="col3">
          <FieldInput />
        </Field>
        <Field id="log">
          <FieldInput />
        </Field>
      </Form> */}
      <ContactForm />
    </ErrorBoundary>
  );
}

export default App;
