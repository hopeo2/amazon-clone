const Rating = {
    render: (prop) => {
        if(!prop.value) {
            return '<div></div>'
            }
            return `
            <div class="rating">
                <span>
                    <i class="${prop.value >= 1 ? 'fa fa-star' : prop.value >= 0.5 ? 'fas fa-star-half-alt' : 'fa fa-star-o'}">
                    </i>
                </span>
                <span>
                    <i class="${prop.value >= 2 ? 'fa fa-star' : prop.value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}">
                    </i>
                </span>
                <span>
                    <i class="${prop.value >= 3 ? 'fa fa-star' : prop.value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}">
                    </i>
                </span>
                <span>
                    <i class="${prop.value >= 4 ? 'fa fa-star' : prop.value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}">
                    </i>
                </span>
                <span>
                    <i class="${prop.value >= 5 ? 'fa fa-star' : prop.value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}">
                    </i>
                </span>
                <span>${prop.text || ''}</span>
            </div>
            `
    }
}
module.exports = Rating;