import { Input, Icon } from 'antd';
import {
    PlusOutlined,
    MinusCircleOutlined
} from '@ant-design/icons';
const CustomExpandIcon = props => {
    if (!props.record.channels) return null; //nothing to expand
    if (props.expanded) {
        return (
            // <div onClick={e => props.onExpand(props.record, e)}>
            <div onClick={propssetRowKeys(props.record)}>
                {/* <Icon type="minus" /> */}
                <MinusCircleOutlined />
            </div>
        );
    } else {
        return (
            <div onClick={propssetRowKeys(props.record)}>
                {/* <Icon type="plus" /> */}
                <PlusOutlined />
            </div>
        );
    }
};

export default CustomExpandIcon;