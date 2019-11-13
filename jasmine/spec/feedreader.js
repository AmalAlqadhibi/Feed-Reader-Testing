/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* spec  that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('URLs are defined', function() {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });
        /* spec that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });
    /*  test suite named "The menu" */
    describe("The menu", function() {
        var menu = $('.menu-icon-link');
        var body = $('body');
        /* spec that ensures the menu element is
         * hidden by default. 
         */
        it('menu element is hiddened', function() {
            expect(body.hasClass("menu-hidden")).toBe(true);
        });
        /* spec that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu is change visibility', function() {
            menu.click();
            expect(body.hasClass("menu-hidden")).toBe(false);
            menu.click();
            expect(body.hasClass("menu-hidden")).toBe(true);
        });
    });
    /* new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
        /* spec that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it("feed has at least single .entry element", function() {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });
    /* new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
        var feedAfterFirstLoad, feedAfterSecondLoad;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedAfterFirstLoad = $('.feed').html();
            loadFeed(1, function() {
                feedAfterSecondLoad = $('.feed').html();
                done();
            });
        });
        });
        /* spec test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it(" feed's content actually changes", function(done) {
            expect(feedAfterFirstLoad).not.toBe(feedAfterSecondLoad);
            done();
        });
    });
}());