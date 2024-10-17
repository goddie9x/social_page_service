const router = require('express').Router();
const pageController = require('../controllers/pageController');
const mapHealthStatusRoute = require('../utils/eureka/healthStatusRoute');

mapHealthStatusRoute(router);
router.post('/create',pageController.createPage);
router.post('/follow',pageController.followPage);
router.get('/following-pages',pageController.getAllPageWhichUserFollowingWithPaginate);
router.get('/managing-pages',pageController.getAllPageWhichUserManagerWithPaginate);
router.delete('/unfollow/:id',pageController.unFollowPage);
router.post('/update',pageController.updatePage);
router.get('/:id',pageController.findPageById);
router.delete('/:id',pageController.deletePage);