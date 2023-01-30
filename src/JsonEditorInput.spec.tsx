import { render, fireEvent, act } from '@testing-library/react';
import { DataProviderContext, ResourceContextProvider } from 'ra-core';
import { Create, SimpleForm, AdminContext } from 'react-admin';
import JsonEditorInput from './JsonEditorInput';

describe('<SimpleForm />', () => {
  const defaultProps = {
    resource: 'posts',
    record: { id: 123, json: '{"enable": false}' },
    sx: { width: 600 },
  };

  it('should render editable jsoneditor', async () => {
    const dataProvider: any = {
      getList: () =>
        Promise.resolve({
          data: [{ id: 1, json: '{"enable": false}', state: true }],
          total: 2,
        }),
      update: jest.fn(() =>
        Promise.resolve({
          data: { id: 1, json: '{"enable": true}', state: false },
        } as any)
      ),
    };

    //@ts-ignore
    let container: HTMLElement | undefined;

    await act(async () => {
      ({ container } = render(
        <AdminContext>
          <ResourceContextProvider value="posts">
            <DataProviderContext.Provider value={dataProvider}>
              <Create {...defaultProps}>
                <SimpleForm>
                  <JsonEditorInput source="json" />
                </SimpleForm>
              </Create>
            </DataProviderContext.Provider>
          </ResourceContextProvider>
        </AdminContext>
      ));
    });

    const first = container?.querySelector('.jsoneditor') as HTMLInputElement;
    expect(first).not.toBeNull();
    const menu = first.querySelector('.jsoneditor-menu') as HTMLInputElement;
    expect(menu).not.toBeNull();

    const input = first.querySelector('input[type=checkbox]') as HTMLInputElement;
    expect(input.checked).toBe(false);

    await act(async () => {
      fireEvent.click(input);
    });
    expect(input.checked).toBe(true);

    // TODO: jsoneditor does not fires onChange in test
  });
});
