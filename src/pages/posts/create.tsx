import {
    Create,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
    Checkbox,
    useCheckboxGroup,
} from "@pankod/refine-antd";

import { IPost, ITag } from "interfaces";

export const PostCreate = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();
    const { selectProps: categorySelectProps } = useSelect<IPost>({
        resource: "categories",
    });

    const { checkboxGroupProps } = useCheckboxGroup<ITag>({
        resource: "tags",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={["category", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item label="Tags" name="tags">
                    <Checkbox.Group {...checkboxGroupProps} />
                </Form.Item>
            </Form>
        </Create>
    );
};