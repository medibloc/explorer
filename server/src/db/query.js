import { BadRequest } from 'http-errors';
import { Op } from 'sequelize';

const MAX_PAGINATION_COUNT = 100;

export const toPagination = (option) => {
  let { from, limit, to } = option;
  from = +from;
  to = +to;
  limit = +limit;
  if (!from) {
    from = 0;
  }
  if (limit) {
    if (to) {
      console.log('limit is ignored'); // eslint-disable-line no-console
    } else {
      limit = Math.min(limit, MAX_PAGINATION_COUNT);
    }
  } else if (to !== 0 && !to) {
    to = from + MAX_PAGINATION_COUNT - 1;
  }
  if (to >= 0) {
    if (to < from) {
      throw new BadRequest('to is smaller than from');
    }
    limit = to - from + 1;
  }
  return { offset: from, limit, to };
};

export const listQuery = ({
  from, limit, q, to, order,
}, searchColumns) => {
  const params = {
    ...toPagination({ from, limit, to }),
  };

  // where (= search, handle q)
  if (q) {
    const where = [];
    if (+q) {
      where.push({ id: +q });
    }
    if (searchColumns) {
      searchColumns.forEach((col) => {
        if (col.type.constructor.key === 'INTEGER') {
          if (+q) {
            where.push({ [col.fieldName]: +q });
          }
        } else {
          where.push({ [col.fieldName]: { [Op.like]: `%${q}%` } });
        }
      });
    }

    params.where = { [Op.or]: where };
  }
  // ordering
  params.order = order || [['id', 'DESC']];

  return params;
};

export const listQueryWithCount = (model, ...args) => {
  const params = listQuery(...args);
  const { offset } = params;
  return model.findAndCountAll(params).then(({ count, rows }) => ({
    data: rows,
    pagination: { count: rows.length, offset, total: count },
  }));
};
