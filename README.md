# mongoose-benitez-franco

Justificación de diseño
Propiedades embebidas:
Se embeben User.profile y Event.location porque son datos internos que no se reutilizan en otras colecciones. Esto permite acceder a la información directamente sin consultas adicionales.

Relación 1:1:
Event.organizer apunta a un único User. Se usa referencia para mantener la integridad y permitir consultas con populate.

Relación 1:N:
Una Category puede tener varios Event, pero cada evento pertenece a una sola categoría. Se usa referencia para facilitar la agrupación y filtrado.

Relación N:M:
User.events y Event.attendees permiten que varios usuarios asistan a varios eventos. Se implementa con arrays de referencias en ambos modelos para mantener flexibilidad y eficiencia.
