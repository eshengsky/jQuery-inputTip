/**
 * Created by Sky on 2015/12/20.
 */
;
+function ($, window, document) {

    //插件名称
    var PLUGIN_NAME = 'inputTip',

    //版本号
        VERSION = '1.0.0',

    //默认值
        DEFAULTS = {
            tip: '',
            position: 'left'
        };

    function Plugin(element, options) {
        this.$input = $(element);
        this.options = options;
        this._init();
    }

    Plugin.prototype = {
        _init: function () {
            var that = this,
                tip = this.options.tip,
                position = this.options.position,
                wrap,
                span;
            that.$input.wrap('<div class="input_tip_wrap"></div>');
            wrap = that.$input.parent('.input_tip_wrap');
            if (position == 'right') {
                $(wrap).append('<span class="input_tip_span">' + tip + '</span>');
            } else {
                $(wrap).prepend('<span class="input_tip_span">' + tip + '</span>');
            }
            span = $(wrap).find('span.input_tip_span');

            var cloneStyles = [
                'background-color',
                'background-image',
                'border-top-width',
                'border-top-style',
                'border-top-color',
                'border-top-left-radius',
                'border-top-right-radius',
                'border-bottom-width',
                'border-bottom-style',
                'border-bottom-color',
                'border-bottom-left-radius',
                'border-bottom-right-radius',
                'border-left-width',
                'border-left-style',
                'border-left-color',
                'border-right-width',
                'border-right-style',
                'border-right-color',
                'box-shadow',
                'font-size',
                'font-family',
                'width',
                'height',
                'line-height',
                'display',
                'position',
                'top',
                'right',
                'bottom',
                'left',
                'margin-top',
                'margin-right',
                'margin-bottom',
                'margin-left',
                'padding-top',
                'padding-right',
                'padding-bottom',
                'padding-left',
                'transition-delay',
                'transition-duration',
                'transition-property',
                'transition-timing-function'
            ];

            for (var i = 0; i < cloneStyles.length; i++) {
                $(wrap).css(cloneStyles[i], that._getOriginalStyle(that.$input[0], cloneStyles[i]));
            }

            $(span).css('color', that.$input.css('color'));

            var input_display = that.$input.css('display');
            if (input_display == 'block') {
                that.$input.css('display', 'inline-block');
            }
            var span_width = $(span).css('width');
            var input_width = that._getOriginalStyle(that.$input[0], 'width');
            var input_bl_width = that._getOriginalStyle(that.$input[0], 'border-left-width');
            var input_br_width = that._getOriginalStyle(that.$input[0], 'border-right-width');
            if (input_width.indexOf('%') >= 0) {
                var cal = 'calc(' + input_width + ' - ' + input_bl_width + ' - ' + input_br_width + ' - ' + span_width + ')';
                that.$input.css('width', cal);
            } else {
                that.$input.css('width', (parseInt(input_width) - parseInt(input_bl_width) - parseInt(input_br_width) - parseInt(span_width)) + 'px');
            }

            that.$input.css('height', 'auto');
            that.$input.css('border', 'none');
            that.$input.css('box-shadow', 'none');
            that.$input.css('transition', 'none');
            that.$input.css('position', 'relative');
            that.$input.css('margin', '0');
            that.$input.css('padding', '0');

            that.$input.on("focus", function () {
                $(wrap).addClass("input_tip_focus");
            });

            that.$input.on("blur", function () {
                $(wrap).removeClass("input_tip_focus");
            });
        },
        _getOriginalStyle: function (element, prop) {
            var parent = element.parentNode,
                computedStyle = getComputedStyle(element),
                display = parent.style.display,
                value;
            parent.style.display = 'none';
            value = computedStyle.getPropertyValue(prop);
            parent.style.display = display;
            return value;
        }
    };

    function fn(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('plugin_' + PLUGIN_NAME);
            var options = $.extend({}, DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data('plugin_' + PLUGIN_NAME, (data = new Plugin(this, options)))
            if (typeof option == 'string') data[option]();
        });
    }

    $.fn[PLUGIN_NAME] = fn;
    $.fn[PLUGIN_NAME].Constructor = Plugin;

}(jQuery, window, document);
