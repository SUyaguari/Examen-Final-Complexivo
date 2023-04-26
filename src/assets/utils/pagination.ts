export function paginateData(page: number = 1, itemsPage: number = 10, total: number = 0) {
    
    if (itemsPage < 1) {
        itemsPage = 10;
    }
    if (page < 1) {
        page = 1;
    }
    
    const pages = Math.ceil(total / itemsPage);

    let pagination = {
        page,
        skip: (page - 1) * itemsPage,
        itemsPage,
        total,
        pages
    }

    return pagination;
}