import { useMany } from "@pankod/refine-core";
import {
    List,
    TextField,
    TagField,
    DateField,
    Table,
    useTable,
    FilterDropdown,
    Select,
    ShowButton,
    useSelect,
    Space,
    EditButton,
    DeleteButton,
    useDrawerForm,
    Drawer,
    Form,
    Create,
    Edit,
    Radio,
    Input,
    useModalForm, 
    Modal,
} from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    // const {
    //     formProps,
    //     drawerProps,
    //     show,
    //     saveButtonProps,
    // } = useDrawerForm<IPost>({
    //     action: "create",
    // });

    // const {
    //     drawerProps,
    //     formProps,
    //     show,
    //     saveButtonProps,
    //     deleteButtonProps,
    //     id,
    // } = useDrawerForm<IPost>({
    //     action: "edit",
    // });

    // const { modalProps, formProps, show } = useModalForm<IPost>({
    //     action: "create",
    // });

    const {
        modalProps,
        formProps,
        show,
        id,
    } = useModalForm<IPost>({
        action: "edit",
    });

    return (
        <>
            <List
                createButtonProps={{
                    onClick: () => {
                        show();
                    },
                }}
            >
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="title" title="title" />
                    <Table.Column
                        dataIndex="status"
                        title="status"
                        render={(value) => <TagField value={value} />}
                    />
                    <Table.Column
                        dataIndex="createdAt"
                        title="createdAt"
                        render={(value) => <DateField format="LLL" value={value} />}
                    />
                    <Table.Column
                        dataIndex={["category", "id"]}
                        title="category"
                        render={(value) => {
                            if (isLoading) {
                                return <TextField value="Loading..." />;
                            }

                            return (
                                <TextField
                                    value={
                                        categoriesData?.data.find(
                                            (item) => item.id === value,
                                        )?.title
                                    }
                                />
                            );
                        }}
                        filterDropdown={(props) => (
                            <FilterDropdown {...props}>
                                <Select
                                    style={{ minWidth: 200 }}
                                    mode="multiple"
                                    placeholder="Select Category"
                                    {...categorySelectProps}
                                />
                            </FilterDropdown>
                        )}
                    />
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        render={(_text, record): React.ReactNode => {
                            return (
                                <Space>
                                    <ShowButton
                                        size="small"
                                        recordItemId={record.id}
                                        hideText
                                    />
                                    <EditButton onClick={() => show(record.id)} />
                                    <DeleteButton
                                        size="small"
                                        recordItemId={record.id}
                                        hideText
                                    />
                                </Space>
                            );
                        }}
                    />
                </Table>
            </List>
            {/* <Drawer {...drawerProps}>
                <Create saveButtonProps={saveButtonProps}>
                    <Form {...formProps} layout="vertical">
                        <Form.Item label="Title" name="title">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Radio.Group>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="published">Published</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Create>
                <Edit
                    saveButtonProps={saveButtonProps}
                    deleteButtonProps={deleteButtonProps}
                    recordItemId={id}
                >
                    <Form {...formProps} layout="vertical">
                        <Form.Item label="Title" name="title">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Radio.Group>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="published">Published</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Edit>
            </Drawer> */}
            <Modal {...modalProps}>
                <Form {...formProps} layout="vertical">
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Radio.Group>
                            <Radio value="draft">Draft</Radio>
                            <Radio value="published">Published</Radio>
                            <Radio value="rejected">Rejected</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};