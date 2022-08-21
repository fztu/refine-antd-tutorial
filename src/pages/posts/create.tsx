import {
    Create,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
    Checkbox,
    useCheckboxGroup,
    Radio,
    useRadioGroup,
    useStepsForm,
    Steps,
    Button,
    SaveButton,
} from "@pankod/refine-antd";

import { IPost, ITag, ILanguage } from "interfaces";

export const PostCreate = () => {
    const {
        current,
        gotoStep,
        stepsProps,
        formProps,
        saveButtonProps,
        queryResult,
        submit,
    } = useStepsForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<IPost>({
        resource: "categories",
    });

    const { checkboxGroupProps } = useCheckboxGroup<ITag>({
        resource: "tags",
    });

    const { radioGroupProps } = useRadioGroup<ILanguage>({
        resource: "languages",
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
        <Create
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
        </Create>
    );
};