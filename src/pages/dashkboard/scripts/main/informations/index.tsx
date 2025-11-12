import { useContext, useEffect } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi } from '@redux/types/scripts';
import validation from './validation';
import useForm from '@hooks/useForm';
import useOpen from '@hooks/useOpen';
import Input from '@components/inputs/Style1';
import Button from '@components/buttons/Style1';
import Flex from '@components/flex/Style1';
import Hover from '@components/hover/Style1';
import Cover from '@components/covers/Style2';
import Form from '@components/forms/Style1';

const Informations = ({script}: {script: IScriptsApi}) => {

  const {onUpdateScript} = useContext(Context);

  const {onOpen, open} = useOpen({});

  const {values, setValues, onChange, onSubmit, validationErrors, loading, edited} = useForm(script, callback, validation);

  async function callback(){
    values.max_loop = Math.round(values.max_loop);
    await onUpdateScript(values);
    onOpen();
  };

  useEffect(() => {
    setValues(script);
  }, [script, setValues]);

  return (
    <div>

        <button onClick={onOpen}>
          <Flex>
            <Hover message="Name of script"><h1>{values.name || "NEW SCRIPT"}</h1></Hover>
            <Hover message="Max loops"><h1>( {values.max_loop} )</h1></Hover>
          </Flex>
        </button>

      {open && 
        <Cover open={open} onClose={onOpen}>
          <Form onSubmit={onSubmit}>

            <Input 
              label1="Name of the script"
              name="name"
              error={validationErrors.name}
              value={values.name}
              onChange={onChange}
            />

            <Input 
              label1="Max Loop"
              type="number"
              name="max_loop"
              error={validationErrors.max_loop}
              value={values.max_loop}
              onChange={onChange}
            />

            {edited && 
              <Button 
                label1="Update" 
                type="submit"
                color="primary" 
                loading={loading}
              />
            }

          </Form>
        </Cover>
      }

    </div>
  );

};

export default Informations;