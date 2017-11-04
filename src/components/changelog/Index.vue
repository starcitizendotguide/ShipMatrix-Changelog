<template>
  <div class="columns">

    <div class="column is-offset-3 is-6">

          <div :key="entry.date" v-for="entry in changelogComputed">
            <div class="content-box highlighted-element">
              <p class="header" @click="change(entry)">{{ entry.date }}</p>

              <ul class="content" v-for="ship in entry.diffReports" v-if="entry.collapsed">
                <li>
                  <h5><a target="_blank" :href="'https://robertsspaceindustries.com' + ships[ship.id].values['URL'] + '#holo-viewer'">{{ ships[ship.id].name }}</a></h5>

                  <ul>
                    <li v-for="field in ship.diffReport.shipFieldChanges">
                        <p v-if="field.diffType == 'ADDED'">
                          Added <i>{{ dataFields[field.dataType].name }}</i> (<code>{{ field.changed }}</code>)
                        </p>
                        <p v-else-if="field.diffType == 'MODIFIED'">
                          Modified <i>{{ dataFields[field.dataType].name  }}</i> <code>{{ field.original + dataFields[field.dataType].unit }}</code> <b-icon pack="fa" icon="long-arrow-right"></b-icon> <code>{{ field.changed + dataFields[field.dataType].unit }}</code>
                        </p>
                        <p v-else-if="field.diffType == 'REMOVED'">
                          Removed <i>{{ dataFields[field.dataType].name }}</i> (<code>{{ field.original }}</code>)
                        </p>
                        <p v-else>#ERROR1: {{ field }}</p>
                    </li>
                  </ul>

                  <ul>
                    <li v-for="(field,name) in ship.diffReport.compiledChanges">
                      <span>{{ name }}</span>
                      <ul>
                        <li v-for="(components, componentType) in field">
                          <span>{{ componentTypeFields[componentType].name }}</span>

                          <ol>
                            <li class="ordered" v-for="componentFields,key in components">

                              <span v-if="key == -1">
                                <span v-if="componentFields[0].diffType == 'ADDED'">
                                  Added one new component.
                                </span>
                                <span v-else-if="componentFields[0].diffType == 'REMOVED'">
                                  Removed this component.
                                </span>
                                <span v-else>#ERROR2: {{ componentFields }}</span>
                              </span>

                              <div v-else>
                                <ul>
                                  <li v-for="componentField in componentFields">

                                      <span v-if="componentField.diffType == 'ADDED'">
                                        Added <i>{{ componentField.componentName }}</i>
                                      </span>
                                      <span v-else-if="componentField.diffType == 'MODIFIED'">
                                        Modified <i>{{ compiledFields[componentField.field].name }}</i> <code>{{ componentField.original }}</code> <b-icon pack="fa" icon="long-arrow-right"></b-icon> <code>{{ componentField.changed }}</code>
                                      </span>
                                      <span v-else-if="componentField.diffType == 'REMOVED'">
                                        Removed <i>{{ componentField.componentName }}</i>
                                      </span>
                                      <span v-else>#ERROR3: {{ componentField }}</span>
                                  </li>
                                </ul>
                              </div>

                            </li>
                          </ol>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>

          </div>
      </div>


    </div>

  </div>
</template>

<script>

const changelogData = require('./../../assets/data/changelog.json');
const compiledFieldsData = require('./../../assets/data/compiledFields.json');
const componentTypeFieldsData = require('./../../assets/data/componentTypeFields.json');

export default {
  name: 'Changelog',
  data: function() {
    return {
      storage: {
        changelog_: changelogData,
      },
      ships: this.$root.ships,
      compiledFields: compiledFieldsData,
      dataFields: this.$root.dataFields,
      componentTypeFields: componentTypeFieldsData
    }
  },
  methods: {
    change: function(e) {
      e.collapsed = !e.collapsed;
    }
  },
  computed: {
    changelogComputed: function() {
      return this.storage.changelog_;
    }
  },
  created: function() {
    this.storage.changelog_.forEach(function(e) { e.collapsed = true; })
  }
}
</script>
