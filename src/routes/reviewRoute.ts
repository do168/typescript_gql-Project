import { Router, Request, Response } from "express";
import reviewMapper from "../mapper/reviewMapper";
import reviewService from "../services/reviewService";
import serviceUtil from "../util/serviceUtil";
/**
 * @swagger
 * tags:
 *  name: Review
 *  description: Review CRUD
 * definitions:
 *  reviewPostParam:
 *    type: object
 *    properties:
 *      meetingId:
 *         tyoe: number
 *      title:
 *         type: string
 *      content:
 *         type: string
 */

const router = Router();
const reviewMapperInstance = new reviewMapper();
const serviceUtilInstance = new serviceUtil();
const reviewServiceInstance = new reviewService(reviewMapperInstance, serviceUtilInstance);

/**
 * @swagger
 *  /reviews/{id}:
 *    get:
 *      tags:
 *      - Review
 *      description: 특정 리뷰의 상세 데이터를 조회한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: id
 *        type: number
 *        in: path
 *        description: "리뷰 번호"
 *      responses:
 *       200:
 *        description: data of the id_review
 *        schema:
 */

router.get("/:id", async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);
		const review = await reviewServiceInstance.getReview(id);
		res.send(review).status(200);
	} catch (error) {
		console.log(error);
		res.send({ Error: error.message }).status(400);
	}
});

/**
 * @swagger
 *  /reviews:
 *    get:
 *      tags:
 *      - Meeting
 *      description: 전체 fㅣ뷰글 리스트를 가져온다. query에 따라 모임별 리뷰나 유저별 리뷰를 가져올 수 있다
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: pageNum
 *        type: number
 *        in: query
 *        description: "페이지 번호"
 *        required: true
 *      - name: meetingId
 *        type: number
 *        in: query
 *        description: "호스트 ID"
 *      - name: userId
 *        type: string
 *        in: query
 *        description: "유저 ID"
 *      responses:
 *       200:
 *        description: board of all meeting list
 *        schema:
 */

router.get("/", async (req: Request, res: Response) => {
	try {
		const meetingId = Number(req.query.meetingId);
		const userId = String(req.query.userId);
		const pageNum = Number(req.query.pageNuM);
		const listMeetingReview = await reviewServiceInstance.listReviews( meetingId, userId, pageNum );
		res.send(listMeetingReview).status(200);
	} catch (error) {
		console.log(error);
		res.send({ Error: error.message }).status(400);
	}
});

/**
 * @swagger
 *  /reviews:
 *    post:
 *      tags:
 *      - Review
 *      description: 리뷰 등록 api
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - in: body
 *        name: reviewPostParam
 *        schema:
 *          $ref: '#/definitions/reviewPostParam'
 *      responses:
 *       200:
 *        description:
 *        schema:
 */

router.post("/", async (req: Request, res: Response) => {
	try {
		const param = req.body;
		const postResult = await reviewServiceInstance.createReview(param);
		return res.json(postResult).status(201);
	} catch (error) {
		console.log(error);
		res.send({ Error: error.message }).status(400);
	}
});

/**
 * @swagger
 *  /reviews/{id}:
 *    delete:
 *      tags:
 *      - Review
 *      description: 리뷰 삭제 api
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: id
 *        type: number
 *        in: path
 *        description: "리뷰 ID"
 *      responses:
 *       200:
 *        description: soft delete success
 *        schema:
 */

router.delete("/:id", async (req: Request, res: Response) => {
	try {
		const param = Number(req.params.id);
		const deleteResult = await reviewServiceInstance.deleteReview(param);
		return res.json(deleteResult).status(201);
	} catch (error) {
		console.log(error);
		res.send({ Error: error.message }).status(400);
	}
});

/**
 * @swagger
 *  /reviews/{id}:
 *    put:
 *      tags:
 *      - Review
 *      description: 리뷰 수정 api
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - in: path
 *        name: id
 *        type: number
 *        description: "리뷰 ID"
 *      - in: body
 *        name: reviewPostParam
 *        schema:
 *          $ref: '#/definitions/reviewPostParam'
 *      responses:
 *       200:
 *        description: 
 *        schema:
 */

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const param = Number(req.params.id);
    const body = req.body;
    const result = await reviewServiceInstance.updateReview(param, body);
    return res.json(result).status(200);
  } catch (error) {
    console.log(error);
    res.send({Error: error.message }).status(400);
  }
});

export default router;
