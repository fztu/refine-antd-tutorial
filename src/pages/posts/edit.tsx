import {
    useStepsForm,
    useSelect,
    Form,
    Input,
    Select,
    Steps,
    Button,
    SaveButton,
    Edit,
} from "@pankod/refine-antd";

import { IPost, ICategory, ITag, ILanguage } from "interfaces";

export const PostEdit: React.FC = () => {
    const {
        current,
        gotoStep,
        stepsProps,
        formProps,
        saveButtonProps,
        queryResult,
        submit,
    } = useStepsForm<IPost>();

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    const formList = [
        <>
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
        </>,
        <>
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
        </>,
    ];

    return (
        <Edit
            actionButtons={
                <>
                    {current > 0 && (
                        <Button
                            onClick={() => {
                                gotoStep(current - 1);
                            }}
                        >
                            Previous
                        </Button>
                    )}
                    {current < formList.length - 1 && (
                        <Button
                            onClick={() => {
                                gotoStep(current + 1);
                            }}
                        >
                            Next
                        </Button>
                    )}
                    {current === formList.length - 1 && (
                        <SaveButton
                            {...saveButtonProps}
                            style={{ marginRight: 10 }}
                            onClick={() => submit()}
                        />
                    )}
                </>
            }
        >
            <Steps {...stepsProps}>
                <Steps.Step title="First Step" />
                <Steps.Step title="Second Step" />
            </Steps>
            <Form {...formProps} layout="vertical">
                {formList[current]}
            </Form>
        </Edit>
    );
};