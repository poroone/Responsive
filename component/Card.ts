const Card = {
    setup() {
        return {

        }
    },
    render() {
        return {
            tag: "div",
            props: {
                class: "card"
            },
            children: [{
                tag: "p",
                props: {
                    class: "card-header"
                },
                children: "卡片头"
            }, {
                tag: "p",
                props: {
                    class: "card-body"
                },
                children: "卡片内容"
            }, {
                tag: "p",
                props: {
                    class: "card-footer"
                },
                children: "卡片尾"
            }]
        }
    }
}

export default Card