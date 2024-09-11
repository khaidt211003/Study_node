const Handlebars = require('handlebars')
module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
      const sortTypes = field === sort.column ? sort.type : 'default';
      const icons = {
          default: 'bi bi-funnel-fill',
          asc: 'bi bi-sort-alpha-up',
          desc: 'bi bi-sort-alpha-down-alt',
      }
      const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
      }
      const icon = icons[sortTypes]
      const type = types[sortTypes]
      const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)
      const output = `<a href="${href}"><i class="${icon}"></i></a>`
      return new Handlebars.SafeString(output);
  }
}