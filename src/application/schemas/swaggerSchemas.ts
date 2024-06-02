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
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-06-02T12:00:00Z"
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
 *     CourseChangeStudentResDTO:
 *       type: object
 *       properties:
 *         courseId:
 *           type: number
 *           example: 123
 *         course:
 *           type: string
 *           example: "Curso de TypeScript"
 *         success:
 *           type: array
 *           items:
 *             type: number
 *           example: [101, 102, 103]
 *         failed:
 *           type: array
 *           items:
 *             type: number
 *           example: [104, 105]
 *
 *     CourseAddStudentRequest:
 *       type: object
 *       properties:
 *         studentIds:
 *           type: array
 *           items:
 *             type: number
 *           example: [1, 2, 3]
 *       required:
 *         - studentIds
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
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-06-02T12:00:00Z"
 *
 *     StudentRequest:
 *       type: object
 *       properties:
 *         cpf:
 *           type: string
 *           example: "12345678900"
 *         courseId:
 *           type: integer
 *           example: 1
 *         personData:
 *           $ref: '#/components/schemas/PersonRequest'
 *       required:
 *         - cpf
 *         - courseId
 *         - personData
 *
 *     StudentUpdate:
 *       type: object
 *       properties:
 *         active:
 *           type: boolean
 *         personData:
 *           $ref: '#/components/schemas/PersonRequest'
 *       required:
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
 *           example: "12345678900"
 *         enrollment:
 *           type: string
 *           example: "20210001"
 *         active:
 *           type: boolean
 *           example: true
 *         course:
 *           $ref: '#/components/schemas/CourseResponse'
 *         personData:
 *           $ref: '#/components/schemas/PersonResponse'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-06-02T12:00:00Z"
 *
 *     TeacherRequest:
 *       type: object
 *       properties:
 *         cpfCnpj:
 *           type: string
 *           example: "12345678000100"
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
 *     TeacherUpdate:
 *       type: object
 *       properties:
 *         specialization:
 *           type: string
 *           example: "Desenvolvimento Web"
 *         experienceYears:
 *           type: integer
 *           example: 10
 *         active:
 *           type: boolean
 *         personData:
 *           $ref: '#/components/schemas/PersonRequest'
 *       required:
 *         - specialization
 *         - experienceYears
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
 *           example: "12345678000100"
 *         specialization:
 *           type: string
 *           example: "Desenvolvimento Web"
 *         experienceYears:
 *           type: integer
 *           example: 10
 *         active:
 *           type: boolean
 *           example: true
 *         course:
 *           $ref: '#/components/schemas/CourseResponse'
 *         personData:
 *           $ref: '#/components/schemas/PersonResponse'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-06-02T12:00:00Z"
 *
 *     UserRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: "john_doe"
 *         password:
 *           type: string
 *           example: "Password@123"
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
 *         phone:
 *           type: string
 *           example: "54123456789"
 *         gender:
 *           type: string
 *           enum:
 *              - masculino
 *              - feminino
 *              - outros
 *           example: "masculino"
 *       required:
 *         - name
 *         - birthDate
 *         - email
 *         - phone
 *         - gender
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
 *         active:
 *           type: boolean
 *           example: true
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
 *         active:
 *           type: boolean
 *           example: true
 *     RelatoryResponseDTO:
 *       type: object
 *       properties:
 *         totalCourses:
 *           type: integer
 *           example: 100
 *         newCourses:
 *           type: integer
 *           example: 10
 *         activeCourses:
 *           type: integer
 *           example: 80
 *         totalStudents:
 *           type: integer
 *           example: 500
 *         activeStudents:
 *           type: integer
 *           example: 450
 *         enrolledStudents:
 *           type: integer
 *           example: 400
 *         totalTeachers:
 *           type: integer
 *           example: 50
 *         activeTeachers:
 *           type: integer
 *           example: 45
 *         teachingTeachers:
 *           type: integer
 *           example: 40
 *         coursesMostEnrolled:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mathematics"
 *               students:
 *                 type: integer
 *                 example: 100
 *         totalGender:
 *           type: object
 *           properties:
 *             male:
 *               type: integer
 *               example: 300
 *             female:
 *               type: integer
 *               example: 150
 *             others:
 *               type: integer
 *               example: 50
 *         recentlyRegistered:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Jane Doe"
 *               curso:
 *                 type: string
 *                 example: "Physics"
 *                 nullable: true
 *               ativo:
 *                 type: boolean
 *                 example: true
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-05-15T10:00:00Z"
 */
