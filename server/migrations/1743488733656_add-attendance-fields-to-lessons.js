exports.up = (pgm) => {
    pgm.addColumns('lesson', {
        attendanceCode: { type: 'varchar(255)', notNull: false },
        attendanceActive: { type: 'boolean', default: false, notNull: true },
    });
};

exports.down = (pgm) => {
    pgm.dropColumns('lesson', ['attendanceCode', 'attendanceActive']);
};
