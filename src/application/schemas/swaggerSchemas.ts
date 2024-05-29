/**
 * @swagger
 * components:
 *   schemas:
 *     CourseResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Curso de TypeScript"
 *         category:
 *           type: string
 *           example: "Programação"
 *         active:
 *           type: boolean
 *           example: true
 *         description:
 *           type: string
 *           example: "Curso completo de TypeScript."
 *         teacher:
 *           type: string
 *           example: "Maria Antonieta."
 *
 *     CourseRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Curso de TypeScript"
 *         category:
 *           type: string
 *           example: "Programação"
 *         active:
 *           type: boolean
 *           example: true
 *         description:
 *           type: string
 *           example: "Curso completo de TypeScript."
 *       required:
 *         - name
 *         - category
 *         - active
 *         - description
 *
 *     CourseFullResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Curso de TypeScript"
 *         category:
 *           type: string
 *           example: "Programação"
 *         active:
 *           type: boolean
 *           example: true
 *         description:
 *           type: string
 *           example: "Curso completo de TypeScript."
 *         teacher:
 *           $ref: '#/components/schemas/TeacherResponse'
 *         students:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/StudentResponse'
 *
 *     StudentRequest:
 *       type: object
 *       properties:
 *         cpf:
 *           type: string
 *           example: "123.456.789-00"
 *         enrollment:
 *           type: string
 *           example: "20210001"
 *         courseId:
 *           type: integer
 *           example: 1
 *         personData:
 *           $ref: '#/components/schemas/PersonRequest'
 *       required:
 *         - cpf
 *         - enrollment
 *         - courseId
 *         - personData
 *
 *     StudentFullResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         cpf:
 *           type: string
 *           example: "123.456.789-00"
 *         enrollment:
 *           type: string
 *           example: "20210001"
 *         course:
 *           $ref: '#/components/schemas/CourseResponse'
 *         personData:
 *           $ref: '#/components/schemas/PersonResponse'
 *
 *     TeacherRequest:
 *       type: object
 *       properties:
 *         cpfCnpj:
 *           type: string
 *           example: "12.345.678/0001-00"
 *         specialization:
 *           type: string
 *           example: "Desenvolvimento Web"
 *         experienceYears:
 *           type: integer
 *           example: 10
 *         courseId:
 *           type: integer
 *           example: 1
 *         personData:
 *           $ref: '#/components/schemas/PersonRequest'
 *       required:
 *         - cpfCnpj
 *         - specialization
 *         - experienceYears
 *         - courseId
 *         - personData
 *
 *     TeacherFullResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         cpfCnpj:
 *           type: string
 *           example: "12.345.678/0001-00"
 *         specialization:
 *           type: string
 *           example: "Desenvolvimento Web"
 *         experienceYears:
 *           type: integer
 *           example: 10
 *         course:
 *           $ref: '#/components/schemas/CourseResponse'
 *         personData:
 *           $ref: '#/components/schemas/PersonResponse'
 *
 *     UserRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: "john_doe"
 *         password:
 *           type: string
 *           example: "password123"
 *       required:
 *         - username
 *         - password
 *
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: "john_doe"
 *         active:
 *           type: boolean
 *           example: true
 *
 *     PersonRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         birthDate:
 *           type: string
 *           format: date
 *           example: "1990-01-01"
 *         email:
 *           type: string
 *           example: "johndoe@example.com"
 *       required:
 *         - name
 *         - birthDate
 *         - email
 *
 *     PersonResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "John Doe"
 *         birthDate:
 *           type: string
 *           format: date
 *           example: "1990-01-01"
 *         email:
 *           type: string
 *           example: "johndoe@example.com"
 *
 *     StudentResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         enrollment:
 *           type: string
 *           example: "20210001"
 *         name:
 *           type: string
 *           example: "Jane Smith"
 *
 *     TeacherResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         specialization:
 *           type: string
 *           example: "Desenvolvimento Web"
 *         experienceYears:
 *           type: integer
 *           example: 10
 *         name:
 *           type: string
 *           example: "John Doe"
 */
