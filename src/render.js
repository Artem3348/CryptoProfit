function renderList(list, $node) {
    const nameList = this.getNames(list);
    nameList.forEach(name => {
        const $newOption = new Option(name, name);
        $node.append($newOption);
    });
}

function getPrice(data, amount) {
    const price = data.market_data.current_price.usd * amount;

    return price;
}
  
function getImg(data) {
    const img = data.image.thumb;

    return img;
}

function renderPrice($node, price) {
    $node.textContent = `${price.toFixed(5)}$`;

    return true;
}

function renderImg(img, name, $url, $icon) {
    if (name.includes(' ')) {
        name = name.replaceAll(' ', '-');
    }
    name = name.toLowerCase();
    $url.setAttribute('href', `https://www.coingecko.com/en/coins/${name}`);
    $icon.setAttribute('src', img);

    return true;
}