import * as React from 'react';
import { Button, Select, Input, Form } from 'antd';

const { Option } = Select;

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let form = {}
                for (let i = 0; i < this.props.filters.length; i++) {
                    if (values[this.props.filters[i].key] === undefined) {
                        form[this.props.filters[i].key] = ''
                    }
                    else {
                        form[this.props.filters[i].key] = values[this.props.filters[i].key]
                    }
                }
                this.props.onFilter(form)
            }
        });
    };


    renderFromItems(filters) {
        const { getFieldDecorator } = this.props.form;
        return (
            filters.map((item, index) => (
                <Form.Item label={item.label} key={index}>
                    {item.type === 'input' &&
                        <>
                            {getFieldDecorator(item.key, {})(
                                <Input
                                    style={{ width: 190 }}
                                    placeholder={item.placeholder}
                                />,
                            )}
                        </>
                    }
                    {item.type === 'select' &&
                        <>
                            {getFieldDecorator(item.key, {})(
                                <Select
                                    style={{ width: 190 }}
                                    placeholder={item.placeholder}
                                    allowClear
                                >
                                    {item.data.map((itemJ, indexJ) => (
                                        <Option key={indexJ} value={itemJ.value}>{itemJ.name}</Option>
                                    ))}
                                </Select>
                            )}
                        </>
                    }
                </Form.Item>
            ))
        )
    }

    clearForm() {
        let form = {}
        for (let i = 0; i < this.props.filters.length; i++) {
            form[this.props.filters[i].key] = ''
        }
        this.props.form.setFieldsValue(form);
        this.props.onFilter(form)
    }

    render() {
        return (
            <div>
                {this.props.filters.length > 0 && <div>
                    <span className="list-filter-title">
                        Filter List Options
                </span>
                    <div className="list-filter-container">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            {this.renderFromItems(this.props.filters)}
                            <div className="list-filter-actions">
                                <Form.Item>
                                    <Button icon="filter" loading={this.props.loading_api} type="primary" htmlType="submit" className="login-form-button">
                                        {'Filter List'}
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={() => this.clearForm()} loading={this.props.loading_api} ghost type="primary" className="login-form-button">
                                        {'Clear Filters'}
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>}
            </div>
        )
    }
}


const WrappedForm = Form.create({ name: 'filter-from' })(Filter);
export default WrappedForm

Filter.defaultProps = {
    filters: []
}
